/**
 * Append field to Vary header.
 * @param {Object} res - HTTP response object
 * @param {string} field - Field name to add
 */
function vary(res, field) {
  if (!res || !res.getHeader) {
    throw new TypeError("argument res must be an object");
  }

  const header = res.getHeader("vary") || "";
  const value = append(header, field);
  res.setHeader("vary", value);
}

/**
 * Append field to existing Vary header string.
 * @param {string} header - Existing Vary header
 * @param {string} field - Field name to add
 * @returns {string} Updated Vary header
 */
function append(header, field) {
  if (!field) {
    return header;
  }

  const fields = parse(header);
  const normalizedField = field.toLowerCase();

  if (fields.some(f => f.toLowerCase() === normalizedField)) {
    return header;
  }

  return header ? header + ', ' + field : field;
}

/**
 * Parse Vary header into array of fields.
 * @param {string} header - Vary header string
 * @returns {string[]} Array of field names
 */
function parse(header) {
  if (!header) {
    return [];
  }
  return header.split(",").map((f) => f.trim().toLowerCase());
}

module.exports = vary;
module.exports.append = append;
