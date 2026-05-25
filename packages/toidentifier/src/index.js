/**
 * Convert string to valid JavaScript identifier.
 * @param {string} str - String to convert
 * @returns {string} Valid identifier
 */
function toIdentifier(str) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }

  // Split by spaces, hyphens, underscores
  const parts = str.split(/[\s-_]+/);

  // Capitalize first letter of each part
  const result = parts
    .map((part) => {
      if (part.length === 0) return "";
      return part[0].toUpperCase() + part.slice(1).toLowerCase();
    })
    .join("");

  // If starts with number, prepend underscore
  if (/^\d/.test(result)) {
    return `_${result}`;
  }

  return result;
}

module.exports = toIdentifier;
