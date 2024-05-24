/** @module hevc */

/**
 * List of profiles with their profile numbers (PP) and the compatibility (C).
 *
 * See Annexe 3 Profiles
 * @constant
 * @type {import("../types.js").VCProfileItem[]}
 */
const HEVC_PROFILES = [
  { name: "Main", PP: "1" },
  { name: "Main 10", PP: "2" },
  { name: "Main Still Picture", PP: "3" },

  // Version 2
  { name: "Range Extensions", PP: "4" },

  { name: "High Throughput", PP: "5" },
  { name: "Multiview Main", PP: "6" },
  { name: "Scalable Main", PP: "7" },

  // Version 3
  { name: "3D Main", PP: "8" },
  { name: "Screen Extended", PP: "9" },
  { name: "Scalable Range Extensions", PP: "10" },
  { name: "High Throughput Screen Extended", PP: "11" },
];
const cccc = "hev1"; // TODO: is "hvc1" necessary

/**
 * HEVC Profile Compatibility as a number in the 0..32 range
 * TODO: is that correct
 * @constant
 * @type {number[]}
 */
const HEVC_PROFILE_COMPATIBILITY = Array.from({ length: 32 }, (_, i) => i);

/**
 * HEVC Levels
 * @constant
 * @type {string[]}
 * @see [hevc-levels]{@link https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding#Tiers_and_levels}
 */
// prettier-ignore
const HEVC_LEVELS = [
  "1",
  "2", "2.1",
  "3", "3.1",
  "4", "4.1",
  "5", "5.1", "5.2",
  "6", "6.1", "6.2"
];

/**
 * List of supported tier
 * @constant
 * @type {string[]}
 */
const HEVC_TIER = ["Main", "High"];

// /**
//  * List of supported bit depth
//  * @constant {number[]}
//  */
// const HEVC_BIT_DEPTH = [8, 10, 12, 14, 16];

/** @private  */
const convertLevel = (level) => parseFloat(level) * 10 * 3;

/** @private  */
const formatLevel = (level) => String(convertLevel(level));

/** @private  */
const formatCompatibility = (compatibility) => compatibility.toString(16);

/** @private  */
const formatTier = (tier) => (tier === "Main" ? "L" : "H");

/** @private  */
const formatCodec = (cccc, { PP }, C, T, LL, CC) =>
  `${cccc}.${PP}.${C}.${T}${LL}.${CC}`;

/**
 * Return a list of all possible codec parameter string and their human readable names
 * @returns {import("../types.js").MediaCodecItem[]}
 */
const getAllItems = () =>
  HEVC_PROFILES.map((profile) =>
    HEVC_PROFILE_COMPATIBILITY.map((compatibility) =>
      HEVC_LEVELS.map((level) =>
        HEVC_TIER.map((tier) => {
          // The High tier is only available for level 4.0 and up.
          if (tier === "High" && convertLevel(level) < 120) return;

          return {
            name: `HEVC ${profile.name} Profile Compability ${compatibility} Level ${level} Tier ${tier}`,
            codec: formatCodec(
              cccc,
              profile,
              formatCompatibility(compatibility),
              formatTier(tier),
              formatLevel(level),
              "b0", // TODO
            ),
          };
        }),
      ),
    ),
  )
    .flat(3)
    .filter(Boolean);

/**
 * Get a codec parameter string
 * @param {import("../types.js").HEVCCodecOptions} options
 * @returns {string}
 */
const getCodec = ({
  profile: profileName,
  compatibility,
  level,
  tier,
  constraint = "b0",
}) => {
  const profile = HEVC_PROFILES.find((profile) => profile.name === profileName);
  if (!profile) throw new Error(`Unknown HEVC profile "${profileName}"`);

  if (!HEVC_LEVELS.includes(level)) {
    throw new Error(`Unknown HEVC Level "${level}"`);
  }
  if (!HEVC_TIER.includes(tier)) {
    throw new Error(`Unknown HEVC Tier "${tier}"`);
  }

  return formatCodec(
    cccc,
    profile,
    formatCompatibility(compatibility),
    formatLevel(level),
    formatTier(tier),
    constraint,
  );
};

/**
 * Get a codec human readbable name
 * @param {string} codec a codec string (cccc.PP.C.TLL.CC eg. "hev1.1.3.H34.B0")
 * @returns {string}
 */
const getCodecName = (codec) =>
  getAllItems().find((item) => item.codec === codec)?.name;

export {
  HEVC_PROFILES,
  HEVC_PROFILE_COMPATIBILITY,
  HEVC_LEVELS,
  HEVC_TIER,
  formatCodec,
  formatLevel,
  getAllItems,
  getCodec,
  getCodecName,
};
