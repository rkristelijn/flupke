/**
 * Parse Content-Type header.
 * @param {string|Object} stringOrReq - Content-Type string or request object
 * @returns {{type: string, parameters: Object}} Parsed content type
 */
// @ts-nocheck

function parse(stringOrReq) {
  let str = stringOrReq;

  if (typeof stringOrReq !== "string") {
    // Handle request object with headers
    if (stringOrReq.headers?.["content-type"]) {
      str = stringOrReq.headers["content-type"];
    } else {
      return { type: "", parameters: {} };
    }
  }

  const parts = str.split(";");
  const type = parts[0].trim().toLowerCase();
  const parameters = {};

  for (let i = 1; i < parts.length; i++) {
    const param = parts[i].trim();
    const eqIndex = param.indexOf("=");
    if (eqIndex !== -1) {
      const key = param.substring(0, eqIndex).trim().toLowerCase();
      let value = param.substring(eqIndex + 1).trim();
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      parameters[key] = value;
    }
  }

  return { type, parameters };
}

/**
 * Format content type object to string.
 * @param {{type: string, parameters: Object}} obj - Content type object
 * @returns {string} Formatted content type string
 */
function format(obj) {
  if (!obj || !obj.type) {
    return "";
  }

  let result = obj.type.toLowerCase();
  if (obj.parameters) {
    for (const [key, value] of Object.entries(obj.parameters)) {
      result += `; ${key}=`;
      if (value.indexOf(";") !== -1 || value.indexOf(" ") !== -1) {
        result += `"${value}"`;
      } else {
        result += value;
      }
    }
  }

  return result;
}

module.exports = { parse, format };
