/**
 * @flupkejs/filter-obj — filter-obj
 * @see https://www.npmjs.com/package/filter-obj
 */
module.exports = function filterObj(obj, fn) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) { if (fn(key, value, obj)) result[key] = value; }
  return result;
};
