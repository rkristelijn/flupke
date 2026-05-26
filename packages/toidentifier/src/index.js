/**
 * Convert string to valid JavaScript identifier.
 * @param {string} str - String to convert
 * @returns {string} Valid identifier
 */
function toIdentifier(str) {
  if (typeof str !== "string") {
    str = String(str);
  }

  return str
    .split(" ")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join("")
    .replace(/[^ _0-9a-z]/gi, "");
}

module.exports = toIdentifier;
