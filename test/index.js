import { describe, test } from "node:test";
import assert from "node:assert";

import { HEVC } from "../index.js";

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

// ─── getCodec ─────────────────────────────────────────────────────────────────

describe("getCodec", () => {
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

// ─── getCodecName ─────────────────────────────────────────────────────────────

describe("getCodecName", () => {
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

// ─── getAllItems ───────────────────────────────────────────────────────────────

describe("getAllItems with defaultConstraints", () => {
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

describe("getAllItems", () => {
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
    const lowLevels = new Set(["1", "2", "2.1", "3", "3.1"]);
    for (const item of items) {
      const parts = item.codec.split(".");
      const tl = parts[3]; // e.g. "L93" or "H120"
      if (!tl.startsWith("H")) continue;
      // find level from codec LL value
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
      // max_14bit set (bit2) but no max_12/10/8bit in byte0 (bits 3-1 = 0)
      return (b1 & 0x04) === 0x04 && (b0 & 0x0e) === 0;
    });
    assert.ok(
      max14Items.length > 0,
      "No HT item with max_14bit-only depth found",
    );
  });

  test("standard profiles have no second constraint byte with non-zero depth/chroma", () => {
    for (const item of items) {
      const parts = item.codec.split(".");
      const pp = parts[1];
      if (!["1", "2", "3"].includes(pp)) continue;
      // byte0 bits 2-0 must be zero (reserved for standard profiles)
      const b0 = parseInt(parts[4], 16);
      assert.strictEqual(
        b0 & 0x07,
        0,
        `Standard profile ${item.codec} has non-zero reserved bits in byte0`,
      );
    }
  });

  test("Main Still Picture items always have one_picture_only bit set (byte0 bit3=1)", () => {
    const mspItems = items.filter((i) => i.codec.split(".")[1] === "3");
    assert.ok(mspItems.length > 0);
    for (const item of mspItems) {
      const b0 = parseInt(item.codec.split(".")[4], 16);
      // For MSP profile (standard), bit3 = one_picture_only — but this is enumerated
      // so some items will have it 0 and some 1. Just verify the default item exists.
      // (MSP has 32 constraint combos; not all have opo set)
    }
    // Verify the default MSP codec string is in the list
    assert.ok(
      mspItems.some((i) => i.codec === "hev1.3.c.L93.b8"),
      "Default MSP codec string not found",
    );
  });
});
