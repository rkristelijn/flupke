/**
 * @flupkejs/sort-keys — sort-keys
 * @see https://www.npmjs.com/package/sort-keys
 */
// @ts-nocheck

module.exports = function sortKeys(obj, opts = {}) {
  const { deep = false } = opts;
  const sorted = {};
  const cmp = opts.compare || ((a, b) => a.localeCompare(b));
  for (const key of Object.keys(obj).sort(cmp)) {
    sorted[key] =
      deep &&
      obj[key] &&
      typeof obj[key] === "object" &&
      !Array.isArray(obj[key])
        ? sortKeys(obj[key], opts)
        : obj[key];
  }
  return sorted;
};
