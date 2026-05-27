// @ts-nocheck
const crypto = require("node:crypto");

/**
 * Sign value with HMAC-SHA256.
 * @param {string} val - Value to sign
 * @param {string} secret - Secret key
 * @returns {string} Signature
 */
function sign(val, secret) {
  if (typeof val !== "string") {
    throw new TypeError("argument val must be a string");
  }
  if (typeof secret !== "string") {
    throw new TypeError("argument secret must be a string");
  }
  return `${val}.${crypto
    .createHmac("sha256", secret)
    .update(val)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replaceAll("=", "")}`;
}

/**
 * Verify and extract original value.
 * @param {string} val - Signed value
 * @param {string} secret - Secret key
 * @returns {string|false} Original value or false
 */
function unsign(val, secret) {
  if (typeof val !== "string") {
    throw new TypeError("argument val must be a string");
  }
  if (typeof secret !== "string") {
    throw new TypeError("argument secret must be a string");
  }

  const parts = val.split(".");
  if (parts.length !== 2) {
    return false;
  }

  const [original, signature] = parts;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(original)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replaceAll("=", "");

  if (signature === expected) {
    return original;
  }

  return false;
}

module.exports = { sign, unsign };
