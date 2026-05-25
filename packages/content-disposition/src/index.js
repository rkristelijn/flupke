/**
 * Create Content-Disposition header value.
 * @param {string} filename - Filename
 * @param {{type?: string, fallback?: boolean}} [options] - Options
 * @returns {string} Content-Disposition header value
 */
function contentDisposition(filename, options) {
  const opts = options || {};
  const type = opts.type || "attachment";

  if (!filename) {
    return type;
  }

  let name = filename;
  // Escape special characters
  name = name.replace(/["\\]/g, "\\$&");

  if (opts.fallback !== false) {
    // Remove path separators from fallback
    const fallback = filename.split("/").pop().split("\\").pop();
    if (fallback !== name) {
      name += `; filename*=utf-8''${encodeURIComponent(fallback)}`;
    }
  }

  return `${type}; filename="${name}"`;
}

/**
 * Parse Content-Disposition header value.
 * @param {string} header - Header value to parse
 * @returns {{type: string, filename: string}} Parsed result
 */
function parse(header) {
  if (!header) {
    return null;
  }

  const parts = header.split(";");
  const type = parts[0].trim().toLowerCase();
  let filename = null;

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i].trim();
    const match = part.match(/^filename\*?=(?:utf-8''|)(.+)$/i);
    if (match) {
      let value = match[1];
      // Decode percent-encoded
      try {
        value = decodeURIComponent(value);
      } catch (e) {
        // Ignore decode errors
      }
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      filename = value;
      break;
    }
  }

  return { type, filename };
}

module.exports = contentDisposition;
contentDisposition.parse = parse;
