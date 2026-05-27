// @ts-nocheck
// RFC 6838 media type parser
const MEDIA_TYPE_RE =
  /^([a-z]+)\/([a-z0-9][a-z0-9!#$&\-^_.]*?)(?:\+([a-z0-9][a-z0-9!#$&\-^_.+]*))?$/i;

/**
 * @param {string} str
 * @returns {{ type: string, subtype: string, suffix?: string }}
 */
function parse(str) {
  if (typeof str !== "string")
    throw new TypeError("argument string is required");
  const match = MEDIA_TYPE_RE.exec(str.trim());
  if (!match) throw new TypeError("invalid media type");
  const obj = Object.create(null);
  obj.type = match[1].toLowerCase();
  obj.subtype = match[2].toLowerCase();
  if (match[3]) obj.suffix = match[3].toLowerCase();
  return obj;
}

/**
 * @param {{ type: string, subtype: string, suffix?: string }} obj
 * @returns {string}
 */
function format(obj) {
  if (!obj || typeof obj !== "object")
    throw new TypeError("argument obj is required");
  if (!obj.type || !obj.subtype)
    throw new TypeError("invalid media type object");
  let str = `${obj.type}/${obj.subtype}`;
  if (obj.suffix) str += `+${obj.suffix}`;
  return str;
}

/**
 * @param {string} str
 * @returns {boolean}
 */
function test(str) {
  if (typeof str !== "string") return false;
  return MEDIA_TYPE_RE.test(str.trim());
}

module.exports = { parse, format, test };
