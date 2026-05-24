module.exports = function isGlob(s) { return typeof s === 'string' && /[*?{}[\]!()]/.test(s); };
