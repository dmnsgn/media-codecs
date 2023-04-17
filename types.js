/**
 * @typedef {Object} AVCProfileItem
 * @property {string} name
 * @property {string} PP profile numbers as hex string
 * @property {string} CC constraints component as hex string
 */

/**
 * @typedef {Object} CodecItem
 * @property {string} name
 * @property {string} cccc the four-character ID for the codec
 */

/**
 * @typedef {Object} MediaCodecItem
 * @property {string} name
 * @property {string} codec
 */

/**
 * @typedef {Object} AVCCodecOptions
 * @property {string} name Human readable profile name (eg. "Baseline")
 * @property {string} level
 */

/**
 * @typedef {Object} VPCodecOptions
 * @property {string} name Human readable codec name (eg. "VP9")
 * @property {number} profile VP codec profile
 * @property {string} level
 * @property {number} bitDepth
 */

export {};
