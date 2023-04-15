/** @module avc */

/**
 * List of profiles with their profile numbers (PP) and the constraints component (CC).
 * @constant {import("../types.js").AVCProfileItem[]}
 */
const AVC_PROFILES = [
  { name: "Constrained Baseline", PP: "42", CC: "40" },
  { name: "Baseline", PP: "42", CC: "00" },
  { name: "Extended", PP: "58", CC: "00" },
  { name: "Main", PP: "4d", CC: "00" },

  { name: "High", PP: "64", CC: "00" },
  { name: "Progressive High", PP: "64", CC: "08" },
  { name: "Constrained High", PP: "64", CC: "0c" },
  { name: "High 10", PP: "6e", CC: "00" },
  { name: "High 4:2:2", PP: "7a", CC: "00" },
  { name: "High 4:4:4 Predictive", PP: "f4", CC: "00" },
  { name: "High 10 Intra", PP: "6e", CC: "10" },
  { name: "High 4:2:2 Intra", PP: "7a", CC: "10" },
  { name: "High 4:4:4 Intra", PP: "f4", CC: "10" },
  { name: "CAVLC 4:4:4 Intra", PP: "44", CC: "00" },

  { name: "Scalable Baseline", PP: "53", CC: "00" },
  { name: "Scalable Constrained Baseline", PP: "53", CC: "04" },
  { name: "Scalable High", PP: "56", CC: "00" },
  { name: "Scalable Constrained High", PP: "56", CC: "04" },
  { name: "Scalable High Intra", PP: "56", CC: "20" },

  { name: "Stereo High", PP: "80", CC: "00" },
  { name: "Multiview High", PP: "76", CC: "00" },
  { name: "Multiview Depth High", PP: "8a", CC: "00" },
];
const cccc = "avc1";

/**
 * AVC Levels
 * @constant {number[]}
 * @see [wikipedia.org]{@link https://en.wikipedia.org/wiki/Advanced_Video_Coding#Levels}
 */
// prettier-ignore
const AVC_LEVELS = ["1", "1.1", "1.2", "1.3", "2", "2.1", "2.2", "3", "3.1", "3.2", "4", "4.1", "4.2", "5", "5.1", "5.2", "6", "6.1", "6.2"];

/** @private */
const formatLevel = (level) =>
  (parseFloat(level) * 10).toString(16).padStart(2, "0");

/** @private */
const formatCodec = ({ PP, CC }, LL) => `${cccc}.${PP}${CC}${LL}`;

/**
 * Return a list of all possible codec parameter string and their human readable names
 * @returns {import("../types.js").MediaCodecItem[]}
 */
const getAllItems = () =>
  AVC_PROFILES.map((profile) =>
    AVC_LEVELS.map((level) => ({
      name: `AVC ${profile.name} Profile Level ${level}`,
      codec: formatCodec(profile, formatLevel(level)),
    }))
  ).flat();

/**
 * Get a codec parameter string
 * @param {import("../types.js").AVCCodecOptions} options
 * @returns {string}
 */
const getCodec = ({ name, level }) => {
  if (!AVC_LEVELS.includes(level))
    throw new Error(`Unknown AVC Level "${level}"`);

  const profile = AVC_PROFILES.find((profile) => profile.name === name);
  if (!profile) throw new Error(`Unknown AVC Name "${name}"`);

  return formatCodec(profile, formatLevel(level));
};

/**
 * Get a codec human readbable name
 * @param {string} codec a codec string (cccc.PP.LL.DD eg. "vp09.00.10.08")
 * @returns {string}
 */
const getCodecName = (codec) =>
  getAllItems().find((profile) => profile.codec === codec)?.name;

export {
  AVC_PROFILES,
  AVC_LEVELS,
  formatCodec,
  formatLevel,
  getAllItems,
  getCodec,
  getCodecName,
};
