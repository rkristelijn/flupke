/**
 * @flupkejs/wrappy — wrappy
 * @see https://www.npmjs.com/package/wrappy
 */
module.exports = function wrappy(fn, cb) {
  Object.keys(fn).forEach(k => { cb[k] = fn[k]; });
  cb.prototype = fn.prototype;
  return cb;
};
