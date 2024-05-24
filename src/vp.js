/** @module vp */

/**
 * List of codecs
 * @constant
 * @type {import("../types.js").CodecItem[]}
 */
const VP_CODECS = [
  { name: "VP8", cccc: "vp08" },
  { name: "VP9", cccc: "vp09" },
  // { name: "VP10", cccc: "vp10" },
];

/**
 * List of VP profiles numbers
 * @constant {number[]}
 */
const VP_PROFILES = [0, 1, 2, 3];

/**
 * VP Levels
 * @constant
 * @type {string[]}
 * @see [webmproject.org]{@link https://www.webmproject.org/vp9/mp4/}
 */
// prettier-ignore
const VP_LEVELS = [
  "1", "1.1",
  "2", "2.1",
  "3", "3.1",
  "4", "4.1",
  "5", "5.1", "5.2",
  "6", "6.1", "6.2"
];

/**
 * List of supported bit depth
 * @constant
 * @type {number[]}
 */
const VP_BIT_DEPTH = [8, 10, 12];

/** @private  */
const formatProfile = (profile) => String(profile).padStart(2, "0");

/** @private  */
const formatLevel = (level) => String(parseFloat(level) * 10).padStart(2, "0");

/** @private  */
const formatBitDepth = (bitDepth) => String(bitDepth).padStart(2, "0");

/** @private  */
const formatCodec = (cccc, PP, LL, DD) => `${cccc}.${PP}.${LL}.${DD}`;

/**
 * Return a list of all possible codec parameter string and their human readable names
 * @returns {import("../types.js").MediaCodecItem[]}
 */
const getAllItems = () =>
  VP_CODECS.map((codec) =>
    VP_PROFILES.map((profile) =>
      VP_LEVELS.map((level) =>
        VP_BIT_DEPTH.map((bitDepth) => ({
          name: `${codec.name} Profile ${profile} Level ${level} BitDepth ${bitDepth}`,
          codec: formatCodec(
            codec.cccc,
            formatProfile(profile),
            formatLevel(level),
            formatBitDepth(bitDepth),
          ),
        })),
      ),
    ),
  ).flat(4);

/**
 * Get a codec parameter string
 * @param {import("../types.js").VPCodecOptions} options
 * @returns {string}
 */
const getCodec = ({ name, profile, level, bitDepth }) => {
  const codec = VP_CODECS.find((codec) => codec.name === name);
  if (!codec) throw new Error(`Unknown VP Codec "${name}"`);

  if (!VP_PROFILES.includes(profile)) {
    throw new Error(`Unknown VP Profile "${profile}"`);
  }
  if (!VP_LEVELS.includes(level)) {
    throw new Error(`Unknown VP Level "${level}"`);
  }
  if (!VP_BIT_DEPTH.includes(bitDepth)) {
    throw new Error(`Unknown VP BitDepth "${bitDepth}"`);
  }

  return formatCodec(
    codec.cccc,
    formatProfile(profile),
    formatLevel(level),
    formatBitDepth(bitDepth),
  );
};

/**
 * Get a codec human readbable name
 * @param {string} codec a codec string (avc1[.PPCCLL] eg. "avc1.640028")
 * @returns {string}
 */
const getCodecName = (codec) =>
  getAllItems().find((item) => item.codec === codec)?.name;

export {
  VP_CODECS,
  VP_PROFILES,
  VP_LEVELS,
  VP_BIT_DEPTH,
  formatCodec,
  formatLevel,
  getAllItems,
  getCodec,
  getCodecName,
};
