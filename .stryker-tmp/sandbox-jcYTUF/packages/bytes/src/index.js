// @ts-nocheck
const UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

/**
 * Parse byte string to number.
 * @param {string} val - Byte string (e.g., '1KB', '2 mb')
 * @returns {number} Number of bytes
 */
function parse(val) {
  if (typeof val === "number" && !Number.isNaN(val)) {
    return val;
  }
  if (typeof val !== "string") {
    return null;
  }

  // Handle plain numbers
  const plainNum = Number.parseFloat(val);
  if (!Number.isNaN(plainNum) && val.trim() === String(plainNum)) {
    return plainNum;
  }

  const match = val.match(/^(\d+(\.\d+)?)\s*([kKmMgGtTpPzZyY][bB]?)$/);
  if (!match) {
    return null;
  }

  const num = Number.parseFloat(match[1]);
  let unit = match[3].toUpperCase();
  if (unit.endsWith("B")) {
    unit = `${unit[0]}B`;
  }
  const unitIndex = UNITS.indexOf(unit);

  if (unitIndex === -1) {
    return null;
  }

  return Math.round(num * 1024 ** unitIndex);
}

/**
 * Format number to byte string.
 * @param {number} val - Number of bytes
 * @returns {string} Formatted string (e.g., '1KB')
 */
function format(val) {
  if (typeof val !== "number" || Number.isNaN(val) || val < 0) {
    return String(val);
  }

  const neg = val < 0;
  const absVal = Math.abs(val);

  if (absVal === 0) {
    return "0B";
  }

  const exponent = Math.min(
    Math.floor(Math.log(absVal) / Math.log(1024)),
    UNITS.length - 1,
  );
  const num = absVal / 1024 ** exponent;
  const unit = UNITS[exponent];

  const str = num.toFixed(num < 10 ? 2 : 0).replace(/\.00$/, "");
  return (neg ? "-" : "") + str + unit;
}

module.exports = { parse, format };
module.exports.parse = parse;
module.exports.format = format;
