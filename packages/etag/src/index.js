const crypto = require("node:crypto");

/**
 * Generate HTTP ETag from entity.
 * @param {string|Buffer|import('fs').Stats} entity - String, Buffer, or Stats object
 * @param {{weak?: boolean}} [options] - Options object
 * @param {boolean} [options.weak=false] - Whether to generate a weak ETag
 * @returns {string} The ETag string
 */
function etag(entity, options) {
  if (entity === null || entity === undefined) {
    throw new TypeError("argument entity must not be null or undefined");
  }

  const weak = options?.weak;

  // Handle Stats object
  if (typeof entity === "object" && "mtime" in entity && "ino" in entity) {
    const stat = entity;
    const tag = crypto
      .createHash("sha1")
      .update(String(stat.ino))
      .update(String(stat.size))
      .update(String(stat.mtime.getTime()))
      .digest("base64");
    return weak ? `W/"${tag}"` : `"${tag}"`;
  }

  // Handle Buffer
  if (Buffer.isBuffer(entity)) {
    const tag = crypto.createHash("sha1").update(entity).digest("base64");
    return weak ? `W/"${tag}"` : `"${tag}"`;
  }

  // Handle string
  if (typeof entity === "string") {
    const tag = crypto
      .createHash("sha1")
      .update(entity, "utf8")
      .digest("base64");
    return weak ? `W/"${tag}"` : `"${tag}"`;
  }

  throw new TypeError(
    "argument entity must be a string, Buffer, or Stats object",
  );
}

module.exports = etag;
