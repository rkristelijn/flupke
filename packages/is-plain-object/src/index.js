/**
 * @flupkejs/is-plain-object — is-plain-object
 * @see https://www.npmjs.com/package/is-plain-object
 */
module.exports = function isPlainObject(v) {
  if (!v || typeof v !== 'object') return false;
  const p = Object.getPrototypeOf(v);
  return p === Object.prototype || p === null;
};
