module.exports = function sortKeys(obj, opts = {}) {
  const { deep = false } = opts;
  const sorted = {};
  for (const key of Object.keys(obj).sort()) {
    sorted[key] = deep && obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key]) ? sortKeys(obj[key], opts) : obj[key];
  }
  return sorted;
};
