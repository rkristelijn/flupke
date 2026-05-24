module.exports = function importFresh(moduleId) {
  const resolved = require.resolve(moduleId);
  delete require.cache[resolved];
  return require(resolved);
};
