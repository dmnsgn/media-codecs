/**
 * @typedef {Object} VCProfileItem
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
 * @typedef {Object} VPCodecOptions
 * @property {string} name Human readable codec name: "VP8" or "VP9"
 * @property {number} profile 0, 1, 2 or 3
 * @property {string} level
 * @property {number} bitDepth
 */

/**
 * @typedef {Object} AVCodecOptions
 * @property {string} name Human readable codec name: "AV1", potentially AV2 in the future
 * @property {string} profile AV profile name: "Main", "High" or "Professional"
 * @property {string} level
 * @property {string} tier "Main" or "High"
 * @property {number} bitDepth 8, 10 or 12
 */

/**
 * @typedef {Object} AVCCodecOptions
 * @property {string} profile AVC profile name (eg. "Baseline")
 * @property {string} level
 */

/**
 * @typedef {Object} HEVCCodecOptions
 * @property {string} profile HEVC profile name (eg. "Main 10")
 * @property {number} compatibility
 * @property {string} level
 * @property {string} tier "Main" or "High"
 * @property {string} constraint TODO
 */

export {};
