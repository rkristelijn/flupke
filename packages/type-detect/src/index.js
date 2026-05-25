/**
 * @flupkejs/type-detect — type-detect
 * @see https://www.npmjs.com/package/type-detect
 */
module.exports = function typeDetect(val) {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (Array.isArray(val)) return 'Array';
  return Object.prototype.toString.call(val).slice(8, -1);
};
