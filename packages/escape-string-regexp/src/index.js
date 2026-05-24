module.exports = function escapeStringRegexp(str) { return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d'); };
