/**
 * @typedef {object} AVProfileItem
 * @property {string} name
 * @property {string} P profile numbers (seq_profile)
 */

/**
 * @typedef {object} AVCProfileItem
 * @property {string} name
 * @property {string} PP profile numbers as hex string
 * @property {string} CC constraints component as hex string
 */

/**
 * @typedef {object} HEVCProfileItem
 * @property {string} name
 * @property {string} PP profile numbers as decimal string
 * @property {string} C profile compatibility flags as hex string (bit N set = conforms to HEVC profile N)
 * @property {string[]} constraints default constraint bytes as hex strings (up to 6); trailing "00" bytes are omitted when formatted
 */

/**
 * @typedef {object} CodecItem
 * @property {string} name
 * @property {string} cccc the four-character ID for the codec
 */

/**
 * @typedef {object} MediaCodecItem
 * @property {string} name
 * @property {string} codec
 */

/**
 * @typedef {object} VPCodecOptions
 * @property {string} name Human readable codec name: "VP8" or "VP9"
 * @property {number} profile 0, 1, 2 or 3
 * @property {string} level
 * @property {number} bitDepth
 */

/**
 * @typedef {object} AVCodecOptions
 * @property {string} name Human readable codec name: "AV1", potentially AV2 in the future
 * @property {string} profile AV profile name: "Main", "High" or "Professional"
 * @property {string} level
 * @property {string} tier "Main" or "High"
 * @property {number} bitDepth 8, 10 or 12
 */

/**
 * @typedef {object} AVCCodecOptions
 * @property {string} profile AVC profile name (eg. "Baseline")
 * @property {string} level
 */

/**
 * @typedef {object} HEVCCodecOptions
 * @property {string} profile HEVC profile name (eg. "Main 10")
 * @property {string} level
 * @property {string} tier "Main" or "High"
 * @property {string[]} [constraints] up to 6 constraint bytes as hex strings; defaults to the profile's standard constraints
 */

export {};
