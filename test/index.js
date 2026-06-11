import { describe, test } from "node:test";
import assert from "node:assert";

import { AV, AVC, HEVC, VP } from "../index.js";

const {
  HEVC_PROFILES,
  HEVC_CONSTRAINTS,
  HEVC_REXT_CONSTRAINTS,
  HEVC_HT_CONSTRAINTS,
  HEVC_LEVELS,
  HEVC_TIER,
  formatConstraints,
  getAllItems,
  getCodec,
  getCodecName,
} = HEVC;

// ─── formatConstraints ────────────────────────────────────────────────────────

describe("formatConstraints", () => {
  test("single non-zero byte", () => {
    assert.strictEqual(formatConstraints(["b0"]), "b0");
  });
  test("trailing zero byte is stripped", () => {
    assert.strictEqual(formatConstraints(["b0", "00"]), "b0");
  });
  test("multiple trailing zero bytes are stripped", () => {
    assert.strictEqual(formatConstraints(["b0", "00", "00"]), "b0");
  });
  test("non-zero second byte is kept", () => {
    assert.strictEqual(formatConstraints(["b0", "10"]), "b0.10");
  });
  test("trailing zero after non-zero second byte is stripped", () => {
    assert.strictEqual(formatConstraints(["b0", "10", "00"]), "b0.10");
  });
  test("single zero byte is kept (cannot strip first byte)", () => {
    assert.strictEqual(formatConstraints(["00"]), "00");
  });
});

// ─── Constraint table shapes ─────────────────────────────────────────────────

describe("HEVC_CONSTRAINTS (standard profiles)", () => {
  test("has 32 entries", () => {
    assert.strictEqual(HEVC_CONSTRAINTS.length, 32);
  });
  test("each entry is a single-element array", () => {
    for (const c of HEVC_CONSTRAINTS) {
      assert.strictEqual(c.length, 1, `entry ${c} should have 1 element`);
    }
  });
  test("bits 2–0 of each byte are always zero (reserved)", () => {
    for (const [byte] of HEVC_CONSTRAINTS) {
      assert.strictEqual(
        parseInt(byte, 16) & 0x07,
        0,
        `byte ${byte} has non-zero reserved bits`,
      );
    }
  });
  test("covers all 32 combinations of bits 7–3", () => {
    const values = new Set(HEVC_CONSTRAINTS.map(([b]) => parseInt(b, 16)));
    for (let i = 0; i < 32; i++) {
      assert.ok(values.has(i << 3), `missing value ${(i << 3).toString(16)}`);
    }
  });
});

describe("HEVC_REXT_CONSTRAINTS (RExt non-HT profiles)", () => {
  test("has 2048 entries", () => {
    assert.strictEqual(HEVC_REXT_CONSTRAINTS.length, 2048);
  });
  test("each entry has 1 or 2 elements", () => {
    for (const c of HEVC_REXT_CONSTRAINTS) {
      assert.ok(
        c.length === 1 || c.length === 2,
        `entry [${c}] should have 1 or 2 elements`,
      );
    }
  });
  test("2-element entries do not have a zero second byte (pre-stripped)", () => {
    for (const c of HEVC_REXT_CONSTRAINTS) {
      if (c.length === 2) {
        assert.notStrictEqual(c[1], "00", `second byte should not be 00`);
      }
    }
  });
  test("byte 0 bits 1–0 are depth + chroma (not reserved)", () => {
    // Just verify bit 0 (max_422chroma) can be 0 or 1 — both should appear
    const bit0Values = new Set(
      HEVC_REXT_CONSTRAINTS.map(([b]) => parseInt(b, 16) & 0x01),
    );
    assert.ok(bit0Values.has(0), "max_422chroma=0 should appear");
    assert.ok(bit0Values.has(1), "max_422chroma=1 should appear");
  });
  test("monotonic depth: max_8bit set implies max_10bit and max_12bit set", () => {
    for (const [b0] of HEVC_REXT_CONSTRAINTS) {
      const v = parseInt(b0, 16);
      const max8 = (v >> 1) & 1;
      const max10 = (v >> 2) & 1;
      const max12 = (v >> 3) & 1;
      if (max8) {
        assert.strictEqual(
          max10,
          1,
          `max_8bit set but max_10bit not set in ${b0}`,
        );
        assert.strictEqual(
          max12,
          1,
          `max_8bit set but max_12bit not set in ${b0}`,
        );
      }
      if (max10) {
        assert.strictEqual(
          max12,
          1,
          `max_10bit set but max_12bit not set in ${b0}`,
        );
      }
    }
  });
  test("monotonic chroma: max_420chroma set in byte1 implies max_422chroma set in byte0", () => {
    for (const entry of HEVC_REXT_CONSTRAINTS) {
      if (entry.length < 2) continue;
      const b0 = parseInt(entry[0], 16);
      const b1 = parseInt(entry[1], 16);
      const max422 = b0 & 0x01;
      const max420 = (b1 >> 7) & 1;
      const mono = (b1 >> 6) & 1;
      if (max420) {
        assert.strictEqual(
          max422,
          1,
          `max_420chroma set but max_422chroma not set`,
        );
      }
      if (mono) {
        assert.strictEqual(
          max420,
          1,
          `max_monochrome set but max_420chroma not set`,
        );
        assert.strictEqual(
          max422,
          1,
          `max_monochrome set but max_422chroma not set`,
        );
      }
    }
  });
  test("byte 1 bits 2–0 are always zero (no max_14bit for non-HT)", () => {
    for (const entry of HEVC_REXT_CONSTRAINTS) {
      if (entry.length < 2) continue;
      assert.strictEqual(
        parseInt(entry[1], 16) & 0x07,
        0,
        `byte1 ${entry[1]} has non-zero reserved/HT bits`,
      );
    }
  });
  test("no duplicate entries", () => {
    const keys = HEVC_REXT_CONSTRAINTS.map((c) => c.join("."));
    assert.strictEqual(new Set(keys).size, keys.length);
  });
});

describe("HEVC_HT_CONSTRAINTS (HT profiles)", () => {
  test("has 2560 entries", () => {
    assert.strictEqual(HEVC_HT_CONSTRAINTS.length, 2560);
  });
  test("each entry has 1 or 2 elements", () => {
    for (const c of HEVC_HT_CONSTRAINTS) {
      assert.ok(
        c.length === 1 || c.length === 2,
        `entry [${c}] invalid length`,
      );
    }
  });
  test("max_14bit-only entry exists: byte0=00, byte1=04", () => {
    const found = HEVC_HT_CONSTRAINTS.some(
      (c) => c[0] === "00" && c.length === 2 && c[1] === "04",
    );
    assert.ok(
      found,
      "entry [00, 04] (max_14bit only, no source flags) should exist",
    );
  });
  test("max_14bit at byte1 bit2 when any depth constraint is set", () => {
    for (const entry of HEVC_HT_CONSTRAINTS) {
      const b0 = parseInt(entry[0], 16);
      const max12 = (b0 >> 3) & 1;
      if (!max12) continue; // only check entries with depth constraints
      assert.ok(
        entry.length === 2,
        `depth constraint set but no byte1 in [${entry}]`,
      );
      const b1 = parseInt(entry[1], 16);
      const max14 = (b1 >> 2) & 1;
      assert.strictEqual(
        max14,
        1,
        `max_12bit set but max_14bit not set in [${entry}]`,
      );
    }
  });
  test("monotonic depth: max_8bit → max_10bit → max_12bit → max_14bit", () => {
    for (const entry of HEVC_HT_CONSTRAINTS) {
      const b0 = parseInt(entry[0], 16);
      const max8 = (b0 >> 1) & 1;
      const max10 = (b0 >> 2) & 1;
      const max12 = (b0 >> 3) & 1;
      const max14 = entry.length === 2 ? (parseInt(entry[1], 16) >> 2) & 1 : 0;
      if (max8) {
        assert.strictEqual(max10, 1);
        assert.strictEqual(max12, 1);
        assert.strictEqual(max14, 1);
      }
      if (max10) {
        assert.strictEqual(max12, 1);
        assert.strictEqual(max14, 1);
      }
      if (max12) assert.strictEqual(max14, 1);
    }
  });
  test("byte 1 bits 1–0 are always zero", () => {
    for (const entry of HEVC_HT_CONSTRAINTS) {
      if (entry.length < 2) continue;
      assert.strictEqual(parseInt(entry[1], 16) & 0x03, 0);
    }
  });
  test("no duplicate entries", () => {
    const keys = HEVC_HT_CONSTRAINTS.map((c) => c.join("."));
    assert.strictEqual(new Set(keys).size, keys.length);
  });
  test("512 extra entries vs REXT (one per source×chroma×intra×opo×lbr for max_14bit-only depth)", () => {
    // HEVC_HT_CONSTRAINTS has 5 depth combos vs 4 for REXT, delta = 1 extra depth × 16 src × 4 chroma × 8 flags = 512
    assert.strictEqual(
      HEVC_HT_CONSTRAINTS.length - HEVC_REXT_CONSTRAINTS.length,
      512,
    );
  });
});

// ─── HEVC getCodec ────────────────────────────────────────────────────────────

describe("HEVC getCodec", () => {
  test("Main profile defaults", () => {
    assert.strictEqual(
      getCodec({ profile: "Main", level: "3.1", tier: "Main" }),
      "hev1.1.6.L93.b0",
    );
  });
  test("Main 10 profile defaults", () => {
    assert.strictEqual(
      getCodec({ profile: "Main 10", level: "4", tier: "Main" }),
      "hev1.2.4.L120.b0",
    );
  });
  test("Main Still Picture defaults include one_picture_only flag (bit 3 = 0x08)", () => {
    assert.strictEqual(
      getCodec({ profile: "Main Still Picture", level: "3.1", tier: "Main" }),
      "hev1.3.c.L93.b8",
    );
  });
  test("High tier", () => {
    assert.strictEqual(
      getCodec({ profile: "Main", level: "4", tier: "High" }),
      "hev1.1.6.H120.b0",
    );
  });
  test("Range Extensions default (no depth/chroma constraints)", () => {
    assert.strictEqual(
      getCodec({ profile: "Range Extensions", level: "4", tier: "Main" }),
      "hev1.4.10.L120.b0",
    );
  });
  test("Range Extensions with max_8bit constraint in byte0 (bit1=1, bit2=1, bit3=1)", () => {
    // 0xb0 | 0x0e = 0xbe: max_12bit(b3)+max_10bit(b2)+max_8bit(b1), no max_422chroma
    assert.strictEqual(
      getCodec({
        profile: "Range Extensions",
        level: "4",
        tier: "Main",
        constraints: ["be"],
      }),
      "hev1.4.10.L120.be",
    );
  });
  test("Range Extensions with max_8bit + monochrome across two bytes", () => {
    // byte0 = 0xbf (0xb0|depth=0xe|c422=1), byte1 = 0xc0 (max_420chroma+max_monochrome)
    assert.strictEqual(
      getCodec({
        profile: "Range Extensions",
        level: "4",
        tier: "Main",
        constraints: ["bf", "c0"],
      }),
      "hev1.4.10.L120.bf.c0",
    );
  });
  test("High Throughput with max_14bit only (byte1 bit2)", () => {
    // byte0 = 0xb0 (no depth in byte0), byte1 = 0x04 (max_14bit only)
    assert.strictEqual(
      getCodec({
        profile: "High Throughput",
        level: "4",
        tier: "Main",
        constraints: ["b0", "04"],
      }),
      "hev1.5.20.L120.b0.04",
    );
  });
  test("High Throughput with max_12bit + max_14bit", () => {
    // byte0 = 0xb8 (0xb0|max_12bit=0x08), byte1 = 0x04 (max_14bit)
    assert.strictEqual(
      getCodec({
        profile: "High Throughput",
        level: "4",
        tier: "Main",
        constraints: ["b8", "04"],
      }),
      "hev1.5.20.L120.b8.04",
    );
  });
  test("lower_bit_rate constraint (byte1 bit3 = 0x08)", () => {
    assert.strictEqual(
      getCodec({
        profile: "Range Extensions",
        level: "4",
        tier: "Main",
        constraints: ["b0", "08"],
      }),
      "hev1.4.10.L120.b0.08",
    );
  });
  test("throws on unknown profile", () => {
    assert.throws(
      () => getCodec({ profile: "Unknown", level: "4", tier: "Main" }),
      /Unknown HEVC profile/,
    );
  });
  test("throws on unknown level", () => {
    assert.throws(
      () => getCodec({ profile: "Main", level: "99", tier: "Main" }),
      /Unknown HEVC Level/,
    );
  });
  test("throws on unknown tier", () => {
    assert.throws(
      () => getCodec({ profile: "Main", level: "4", tier: "Ultra" }),
      /Unknown HEVC Tier/,
    );
  });
});

// ─── HEVC getCodecName ────────────────────────────────────────────────────────

describe("HEVC getCodecName", () => {
  test("Main profile", () => {
    assert.strictEqual(
      getCodecName("hev1.1.6.L93.b0"),
      "HEVC Main Profile Level 3.1 Tier Main Constraints b0",
    );
  });
  test("Main Still Picture", () => {
    assert.strictEqual(
      getCodecName("hev1.3.c.L93.b8"),
      "HEVC Main Still Picture Profile Level 3.1 Tier Main Constraints b8",
    );
  });
  test("Range Extensions with two constraint bytes", () => {
    assert.strictEqual(
      getCodecName("hev1.4.10.L120.bf.c0"),
      "HEVC Range Extensions Profile Level 4 Tier Main Constraints bf.c0",
    );
  });
  test("High Throughput with max_14bit", () => {
    assert.strictEqual(
      getCodecName("hev1.5.20.L120.b0.04"),
      "HEVC High Throughput Profile Level 4 Tier Main Constraints b0.04",
    );
  });
  test("returns undefined for unknown codec", () => {
    assert.strictEqual(getCodecName("hev1.99.0.L93.b0"), undefined);
  });
});

// ─── HEVC getAllItems ──────────────────────────────────────────────────────────

describe("HEVC getAllItems with defaultConstraints", () => {
  test("returns one item per profile/level/tier (11 profiles × 21 combos = 231)", () => {
    assert.strictEqual(getAllItems(true).length, 231);
  });
  test("each item uses its profile's default constraints", () => {
    const items = getAllItems(true);
    for (const item of items) {
      const pp = item.codec.split(".")[1];
      const profile = HEVC_PROFILES.find((p) => p.PP === pp);
      const expected = formatConstraints(profile.constraints);
      const constraintPart = item.codec.split(".").slice(4).join(".");
      assert.strictEqual(constraintPart, expected, item.codec);
    }
  });
  test("default items are a subset of all items", () => {
    const allCodecs = new Set(getAllItems().map((i) => i.codec));
    for (const item of getAllItems(true)) {
      assert.ok(allCodecs.has(item.codec), `${item.codec} not in full set`);
    }
  });
});

describe("HEVC getAllItems", () => {
  let items;

  test("runs without error", () => {
    items = getAllItems();
  });

  test("correct total count", () => {
    // level/tier combos: 5 levels × Main-only + 8 levels × both tiers = 5 + 16 = 21
    // Standard profiles (PP 1,2,3): 3 × 21 × 32  =   2,016
    // RExt non-HT (PP 4,6,7,8):     4 × 21 × 2048 = 172,032
    // HT (PP 5,9,10,11):             4 × 21 × 2560 = 215,040
    // Total: 389,088
    assert.strictEqual(items.length, 389_088);
  });

  test("every item has a non-empty name and codec string", () => {
    for (const item of items) {
      assert.ok(item.name.length > 0);
      assert.ok(item.codec.length > 0);
    }
  });

  test("no duplicate codec strings", () => {
    const codecs = items.map((i) => i.codec);
    assert.strictEqual(new Set(codecs).size, codecs.length);
  });

  test("all codec strings start with hev1", () => {
    for (const item of items) {
      assert.ok(item.codec.startsWith("hev1."), item.codec);
    }
  });

  test("High tier only appears for level 4.0 and above", () => {
    for (const item of items) {
      const parts = item.codec.split(".");
      const tl = parts[3]; // e.g. "L93" or "H120"
      if (!tl.startsWith("H")) continue;
      const ll = parseInt(tl.slice(1), 10);
      assert.ok(
        ll >= 120,
        `High tier at level LL=${ll} < 120 in ${item.codec}`,
      );
    }
  });

  test("RExt profiles include max_422chroma variants (byte0 bit0=1)", () => {
    const rextItems = items.filter((i) => {
      const pp = i.codec.split(".")[1];
      return ["4", "6", "7", "8"].includes(pp);
    });
    const hasMax422 = rextItems.some((i) => {
      const b0 = parseInt(i.codec.split(".")[4], 16);
      return (b0 & 0x01) === 1;
    });
    assert.ok(hasMax422, "No RExt item with max_422chroma=1 found");
  });

  test("RExt profiles include two-byte constraint entries", () => {
    const twoByteItems = items.filter((i) => {
      const pp = i.codec.split(".")[1];
      return (
        ["4", "6", "7", "8"].includes(pp) && i.codec.split(".").length === 6
      );
    });
    assert.ok(
      twoByteItems.length > 0,
      "No RExt item with a second constraint byte found",
    );
  });

  test("HT profiles include max_14bit entries (byte1 bit2=1, bits3-1=0 in byte0)", () => {
    const max14Items = items.filter((i) => {
      const parts = i.codec.split(".");
      const pp = parts[1];
      if (!["5", "9", "10", "11"].includes(pp)) return false;
      if (parts.length < 6) return false;
      const b1 = parseInt(parts[5], 16);
      const b0 = parseInt(parts[4], 16);
      return (b1 & 0x04) === 0x04 && (b0 & 0x0e) === 0;
    });
    assert.ok(
      max14Items.length > 0,
      "No HT item with max_14bit-only depth found",
    );
  });

  test("standard profiles have no non-zero bits in byte0 bits 2–0 (reserved)", () => {
    for (const item of items) {
      const parts = item.codec.split(".");
      const pp = parts[1];
      if (!["1", "2", "3"].includes(pp)) continue;
      const b0 = parseInt(parts[4], 16);
      assert.strictEqual(
        b0 & 0x07,
        0,
        `Standard profile ${item.codec} has non-zero reserved bits in byte0`,
      );
    }
  });

  test("default Main Still Picture codec string is present", () => {
    assert.ok(
      items.some((i) => i.codec === "hev1.3.c.L93.b8"),
      "Default MSP codec string not found",
    );
  });
});

// ─── AV ───────────────────────────────────────────────────────────────────────

describe("AV getCodec", () => {
  // Format: av01.{P}.{LL}{T}.{DD}
  // LL = ((X-2)*4 + Y), decimal, padded to 2 digits
  // T = first letter of tier ("M" or "H")
  // DD = bitDepth, decimal, padded to 2 digits
  test("Main profile level 2.0 Main tier 8-bit", () => {
    assert.strictEqual(
      AV.getCodec({
        name: "AV1",
        profile: "Main",
        level: "2.0",
        tier: "Main",
        bitDepth: 8,
      }),
      "av01.0.00M.08",
    );
  });
  test("Main profile level 4.0 High tier 10-bit", () => {
    // LL = (4-2)*4+0 = 8 → "08"
    assert.strictEqual(
      AV.getCodec({
        name: "AV1",
        profile: "Main",
        level: "4.0",
        tier: "High",
        bitDepth: 10,
      }),
      "av01.0.08H.10",
    );
  });
  test("Professional profile level 6.3 High tier 12-bit", () => {
    // LL = (6-2)*4+3 = 19 → "19"
    assert.strictEqual(
      AV.getCodec({
        name: "AV1",
        profile: "Professional",
        level: "6.3",
        tier: "High",
        bitDepth: 12,
      }),
      "av01.2.19H.12",
    );
  });
  test("High profile level 7.3 Main tier 10-bit (last level)", () => {
    // LL = (7-2)*4+3 = 23 → "23"
    assert.strictEqual(
      AV.getCodec({
        name: "AV1",
        profile: "High",
        level: "7.3",
        tier: "Main",
        bitDepth: 10,
      }),
      "av01.1.23M.10",
    );
  });
  test("throws on unknown codec name", () => {
    assert.throws(
      () =>
        AV.getCodec({
          name: "AV3",
          profile: "Main",
          level: "2.0",
          tier: "Main",
          bitDepth: 8,
        }),
      /Unknown AV Codec/,
    );
  });
  test("throws on unknown profile", () => {
    assert.throws(
      () =>
        AV.getCodec({
          name: "AV1",
          profile: "Ultra",
          level: "2.0",
          tier: "Main",
          bitDepth: 8,
        }),
      /Unknown AV Profile/,
    );
  });
  test("throws on unknown level", () => {
    assert.throws(
      () =>
        AV.getCodec({
          name: "AV1",
          profile: "Main",
          level: "9.0",
          tier: "Main",
          bitDepth: 8,
        }),
      /Unknown AV Level/,
    );
  });
  test("throws on unknown tier", () => {
    assert.throws(
      () =>
        AV.getCodec({
          name: "AV1",
          profile: "Main",
          level: "2.0",
          tier: "Ultra",
          bitDepth: 8,
        }),
      /Unknown AV Tier/,
    );
  });
  test("throws on unknown bit depth", () => {
    assert.throws(
      () =>
        AV.getCodec({
          name: "AV1",
          profile: "Main",
          level: "2.0",
          tier: "Main",
          bitDepth: 16,
        }),
      /Unknown AV BitDepth/,
    );
  });
});

describe("AV getCodecName", () => {
  test("roundtrip Main level 2.0", () => {
    assert.strictEqual(
      AV.getCodecName("av01.0.00M.08"),
      "AV1 Main Profile Level 2.0 Tier Main BitDepth 8",
    );
  });
  test("roundtrip Professional level 6.3 12-bit", () => {
    assert.strictEqual(
      AV.getCodecName("av01.2.19H.12"),
      "AV1 Professional Profile Level 6.3 Tier High BitDepth 12",
    );
  });
  test("returns undefined for unknown codec", () => {
    assert.strictEqual(AV.getCodecName("av01.9.00M.08"), undefined);
  });
});

describe("AV getAllItems", () => {
  let items;

  test("runs without error", () => {
    items = AV.getAllItems();
  });

  test("correct total count", () => {
    // Level-tier combos: 8 low levels (2.x–3.x) × Main only + 16 high levels (4.x–7.x) × 2 tiers = 40
    // Main (P=0):         40 × 2 bitDepths (8, 10)      =  80
    // High (P=1):         40 × 2 bitDepths               =  80
    // Professional (P=2): 40 × 3 bitDepths (8, 10, 12)  = 120
    // Total: 280
    assert.strictEqual(items.length, 280);
  });

  test("all codec strings start with av01", () => {
    for (const item of items) {
      assert.ok(item.codec.startsWith("av01."), item.codec);
    }
  });

  test("12-bit depth only appears for Professional profile (P=2)", () => {
    for (const item of items) {
      const [, P, , DD] = item.codec.split(".");
      if (DD === "12")
        assert.strictEqual(P, "2", `12-bit in non-Professional: ${item.codec}`);
    }
  });

  test("High tier only appears for level 4.0 and above (LL >= 08)", () => {
    for (const item of items) {
      const llt = item.codec.split(".")[2]; // e.g. "00M" or "08H"
      if (!llt.endsWith("H")) continue;
      const ll = parseInt(llt, 10);
      assert.ok(ll >= 8, `High tier at LL=${ll} in ${item.codec}`);
    }
  });

  test("no duplicate codec strings", () => {
    const codecs = items.map((i) => i.codec);
    assert.strictEqual(new Set(codecs).size, codecs.length);
  });
});

// ─── AVC ──────────────────────────────────────────────────────────────────────

describe("AVC getCodec", () => {
  // Format: avc1.{PP}{CC}{LL}
  // LL = (level * 10).toString(16), padded to 2 hex digits
  test("Main profile level 3.1", () => {
    // 3.1 → 31 → 0x1f
    assert.strictEqual(
      AVC.getCodec({ profile: "Main", level: "3.1" }),
      "avc1.4d001f",
    );
  });
  test("Constrained Baseline level 3", () => {
    // 3 → 30 → 0x1e; CC=40 (constraint_set0_flag)
    assert.strictEqual(
      AVC.getCodec({ profile: "Constrained Baseline", level: "3" }),
      "avc1.42401e",
    );
  });
  test("High profile level 4.1", () => {
    // 4.1 → 41 → 0x29
    assert.strictEqual(
      AVC.getCodec({ profile: "High", level: "4.1" }),
      "avc1.640029",
    );
  });
  test("CAVLC 4:4:4 Intra level 1 (PP=2c, 44 decimal)", () => {
    // PP=0x2c=44 decimal; level 1 → 10 → 0x0a
    assert.strictEqual(
      AVC.getCodec({ profile: "CAVLC 4:4:4 Intra", level: "1" }),
      "avc1.2c000a",
    );
  });
  test("Scalable High Intra (CC=10, constraint_set3_flag)", () => {
    // 3.1 → 0x1f
    assert.strictEqual(
      AVC.getCodec({ profile: "Scalable High Intra", level: "3.1" }),
      "avc1.56101f",
    );
  });
  test("High 4:4:4 Intra (PP=f4, CC=10)", () => {
    assert.strictEqual(
      AVC.getCodec({ profile: "High 4:4:4 Intra", level: "4" }),
      "avc1.f41028",
    );
  });
  test("level encoding is hex, not decimal", () => {
    // Level 5.1 → 51 decimal → 0x33 hex
    assert.strictEqual(
      AVC.getCodec({ profile: "High", level: "5.1" }),
      "avc1.640033",
    );
  });
  test("throws on unknown profile", () => {
    assert.throws(
      () => AVC.getCodec({ profile: "Unknown", level: "3.1" }),
      /Unknown AVC Profile/,
    );
  });
  test("throws on unknown level", () => {
    assert.throws(
      () => AVC.getCodec({ profile: "Main", level: "9.9" }),
      /Unknown AVC Level/,
    );
  });
});

describe("AVC getCodecName", () => {
  test("Main level 3.1", () => {
    assert.strictEqual(
      AVC.getCodecName("avc1.4d001f"),
      "AVC Main Profile Level 3.1",
    );
  });
  test("Constrained Baseline level 3", () => {
    assert.strictEqual(
      AVC.getCodecName("avc1.42401e"),
      "AVC Constrained Baseline Profile Level 3",
    );
  });
  test("returns undefined for unknown codec", () => {
    assert.strictEqual(AVC.getCodecName("avc1.000000"), undefined);
  });
});

describe("AVC getAllItems", () => {
  let items;

  test("runs without error", () => {
    items = AVC.getAllItems();
  });

  test("correct total count", () => {
    // 22 profiles × 19 levels = 418
    assert.strictEqual(items.length, 418);
  });

  test("all codec strings start with avc1", () => {
    for (const item of items) {
      assert.ok(item.codec.startsWith("avc1."), item.codec);
    }
  });

  test("no duplicate codec strings", () => {
    const codecs = items.map((i) => i.codec);
    assert.strictEqual(new Set(codecs).size, codecs.length);
  });

  test("level component is hex (level 5.1 = 0x33, not 51)", () => {
    const item = items.find((i) => i.name === "AVC High Profile Level 5.1");
    assert.ok(item, "AVC High Profile Level 5.1 not found");
    assert.ok(item.codec.endsWith("33"), `expected hex 33, got ${item.codec}`);
  });
});

// ─── VP ───────────────────────────────────────────────────────────────────────

describe("VP getCodec", () => {
  // Format: {cccc}.{PP}.{LL}.{DD}
  // LL = (level * 10).toString(), decimal, padded to 2 digits
  test("VP9 profile 0 level 4.1 8-bit", () => {
    assert.strictEqual(
      VP.getCodec({ name: "VP9", profile: 0, level: "4.1", bitDepth: 8 }),
      "vp09.00.41.08",
    );
  });
  test("VP8 profile 2 level 2 10-bit", () => {
    // VP_LEVELS uses "2" not "2.0"; 2*10 = 20 → "20"
    assert.strictEqual(
      VP.getCodec({ name: "VP8", profile: 2, level: "2", bitDepth: 10 }),
      "vp08.02.20.10",
    );
  });
  test("VP9 profile 3 level 6.2 12-bit", () => {
    // LL = 6.2*10 = 62 → "62"
    assert.strictEqual(
      VP.getCodec({ name: "VP9", profile: 3, level: "6.2", bitDepth: 12 }),
      "vp09.03.62.12",
    );
  });
  test("level component is decimal, not hex (level 5.1 = 51, not 0x33)", () => {
    assert.strictEqual(
      VP.getCodec({ name: "VP9", profile: 0, level: "5.1", bitDepth: 8 }),
      "vp09.00.51.08",
    );
  });
  test("throws on unknown codec name", () => {
    assert.throws(
      () =>
        VP.getCodec({ name: "VP10", profile: 0, level: "4.1", bitDepth: 8 }),
      /Unknown VP Codec/,
    );
  });
  test("throws on unknown profile", () => {
    assert.throws(
      () => VP.getCodec({ name: "VP9", profile: 4, level: "4.1", bitDepth: 8 }),
      /Unknown VP Profile/,
    );
  });
  test("throws on unknown level", () => {
    assert.throws(
      () => VP.getCodec({ name: "VP9", profile: 0, level: "9.0", bitDepth: 8 }),
      /Unknown VP Level/,
    );
  });
  test("throws on unknown bit depth", () => {
    assert.throws(
      () =>
        VP.getCodec({ name: "VP9", profile: 0, level: "4.1", bitDepth: 16 }),
      /Unknown VP BitDepth/,
    );
  });
});

describe("VP getCodecName", () => {
  test("VP9 profile 0 level 4.1 8-bit", () => {
    assert.strictEqual(
      VP.getCodecName("vp09.00.41.08"),
      "VP9 Profile 0 Level 4.1 BitDepth 8",
    );
  });
  test("VP8 profile 1 level 3.1 10-bit", () => {
    assert.strictEqual(
      VP.getCodecName("vp08.01.31.10"),
      "VP8 Profile 1 Level 3.1 BitDepth 10",
    );
  });
  test("returns undefined for unknown codec", () => {
    assert.strictEqual(VP.getCodecName("vp09.99.00.08"), undefined);
  });
});

describe("VP getAllItems", () => {
  let items;

  test("runs without error", () => {
    items = VP.getAllItems();
  });

  test("correct total count", () => {
    // 2 codecs × 4 profiles × 14 levels × 3 bit depths = 336
    assert.strictEqual(items.length, 336);
  });

  test("codec strings for VP8 start with vp08 and VP9 with vp09", () => {
    for (const item of items) {
      assert.ok(
        item.codec.startsWith("vp08.") || item.codec.startsWith("vp09."),
        item.codec,
      );
    }
  });

  test("level component is decimal (level 5.1 → 51, not 0x33)", () => {
    const item = items.find(
      (i) => i.name === "VP9 Profile 0 Level 5.1 BitDepth 8",
    );
    assert.ok(item, "VP9 Profile 0 Level 5.1 BitDepth 8 not found");
    assert.strictEqual(item.codec, "vp09.00.51.08");
  });

  test("no duplicate codec strings", () => {
    const codecs = items.map((i) => i.codec);
    assert.strictEqual(new Set(codecs).size, codecs.length);
  });
});
