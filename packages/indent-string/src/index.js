module.exports = function indentString(str, count = 1, opts = {}) {
  const indent = (opts.indent || ' ').repeat(count);
  return str.replace(/^/gm, indent);
};
