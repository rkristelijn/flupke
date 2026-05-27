// @ts-nocheck
// @flupkejs/slash-trailing
exports.ensureLeading = (p) => (p.startsWith("/") ? p : `/${p}`);
exports.removeTrailing = (p) =>
  p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
exports.ensureTrailing = (p) => (p.endsWith("/") ? p : `${p}/`);
