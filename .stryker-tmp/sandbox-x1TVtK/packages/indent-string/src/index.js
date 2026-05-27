/**
 * @flupkejs/indent-string — indent-string
 * @see https://www.npmjs.com/package/indent-string
 */
// @ts-nocheck

module.exports = function indentString(str, count = 1, opts = {}) {
  const indent = (opts.indent || " ").repeat(count);
  return str.replace(/^/gm, indent);
};
