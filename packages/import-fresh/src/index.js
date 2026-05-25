/**
 * @flupkejs/import-fresh — import-fresh
 * @see https://www.npmjs.com/package/import-fresh
 */
module.exports = function importFresh(moduleId) {
  const resolved = require.resolve(moduleId);
  delete require.cache[resolved];
  return require(resolved);
};
