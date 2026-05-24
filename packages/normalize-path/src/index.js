module.exports = function normalizePath(p) { return p.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/\/$/, '') || '/'; };
