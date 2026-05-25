/**
 * @flupkejs/map-obj — map-obj
 * @see https://www.npmjs.com/package/map-obj
 */
module.exports = function mapObj(obj, fn) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const [k, v] = fn(key, value, obj);
    result[k] = v;
  }
  return result;
};
