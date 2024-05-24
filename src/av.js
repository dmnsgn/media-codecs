/** @module av */

/**
 * List of codecs
 * @constant
 * @type {import("../types.js").CodecItem[]}
 */
const AV_CODECS = [
  { name: "AV1", cccc: "av01" },
  // { name: "AV2", cccc: "av02" },
];

/**
 * List of AV profiles numbers
 * @constant
 * @type {import("../types.js").AVProfileItem[]}
 * @see [av1-spec]{@link https://aomediacodec.github.io/av1-spec/#profiles}
 */
const AV_PROFILES = [
  { name: "Main", P: "0" },
  { name: "High", P: "1" },
  { name: "Professional", P: "2" },
];

/**
 * AV Levels
 * @constant
 * @type {string[]}
 * @see [av1-spec]{@link https://aomediacodec.github.io/av1-spec/#levels}
 */
// prettier-ignore
const AV_LEVELS = [
  "2.0", "2.1", "2.2", "2.3",
  "3.0", "3.1", "3.2", "3.3",
  "4.0", "4.1", "4.2", "4.3",
  "5.0", "5.1", "5.2", "5.3",
  "6.0", "6.1", "6.2", "6.3",
  "7.0", "7.1", "7.2", "7.3"
];

/**
 * List of supported tier
 * @constant
 * @type {string[]}
 */
const AV_TIER = ["Main", "High"];

/**
 * List of supported bit depth
 * @constant
 * @type {number[]}
 */
const AV_BIT_DEPTH = [8, 10, 12];

/** @private  */
const formatProfile = ({ P }) => P;

/** @private  */
const convertLevel = (level) => {
  const [X, Y] = level.split(".");
  return (parseInt(X, 10) - 2) * 4 + parseInt(Y, 10);
};

/** @private  */
const formatLevel = (level) => String(convertLevel(level)).padStart(2, "0");

/** @private  */
const formatTier = (tier) => tier.at(0);

/** @private  */
const formatBitDepth = (bitDepth) => String(bitDepth).padStart(2, "0");

/** @private  */
const formatCodec = (cccc, P, LL, T, DD) => `${cccc}.${P}.${LL}${T}.${DD}`;

/**
 * Return a list of all possible codec parameter string and their human readable names
 * @returns {import("../types.js").MediaCodecItem[]}
 */
const getAllItems = () =>
  AV_CODECS.map((codec) =>
    AV_PROFILES.map((profile) =>
      AV_LEVELS.map((level) =>
        AV_TIER.map((tier) => {
          // The High tier is only available for level 4.0 and up.
          if (tier === "High" && convertLevel(level) < 8) return;

          return AV_BIT_DEPTH.map((bitDepth) => {
            // 12 bitDepth is only available for the	"Professional" profile
            if (profile.P !== "2" && bitDepth === 12) return;

            return {
              name: `${codec.name} ${profile.name} Profile Level ${level} Tier ${tier} BitDepth ${bitDepth}`,
              codec: formatCodec(
                codec.cccc,
                formatProfile(profile),
                formatLevel(level),
                formatTier(tier),
                formatBitDepth(bitDepth),
              ),
            };
          });
        }),
      ),
    ),
  )
    .flat(4)
    .filter(Boolean);

/**
 * Get a codec parameter string
 * @param {import("../types.js").AVCodecOptions} options
 * @returns {string}
 */
const getCodec = ({ name, profile: profileName, level, tier, bitDepth }) => {
  const codec = AV_CODECS.find((codec) => codec.name === name);
  if (!codec) throw new Error(`Unknown AV Codec "${name}"`);

  const profile = AV_PROFILES.find((profile) => profile.name === profileName);
  if (!AV_PROFILES) {
    throw new Error(`Unknown AV Profile "${profileName}"`);
  }
  if (!AV_LEVELS.includes(level)) {
    throw new Error(`Unknown AV Level "${level}"`);
  }
  if (!AV_TIER.includes(tier)) {
    throw new Error(`Unknown AV Tier "${tier}"`);
  }
  if (!AV_BIT_DEPTH.includes(bitDepth)) {
    throw new Error(`Unknown AV BitDepth "${bitDepth}"`);
  }

  return formatCodec(
    codec.cccc,
    formatProfile(profile),
    formatLevel(level),
    formatTier(tier),
    formatBitDepth(bitDepth),
  );
};

/**
 * Get a codec human readbable name
 * @param {string} codec a codec string (av01.P.LLT.DD eg. "av01.P.LLT.DD")
 * @returns {string}
 */
const getCodecName = (codec) =>
  getAllItems().find((item) => item.codec === codec)?.name;

export {
  AV_CODECS,
  AV_PROFILES,
  AV_LEVELS,
  AV_TIER,
  AV_BIT_DEPTH,
  formatCodec,
  formatLevel,
  getAllItems,
  getCodec,
  getCodecName,
};
