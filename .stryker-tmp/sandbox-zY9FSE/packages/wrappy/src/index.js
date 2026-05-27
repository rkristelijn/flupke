/**
 * @flupkejs/wrappy — wrappy
 * @see https://www.npmjs.com/package/wrappy
 */
// @ts-nocheck

module.exports = function wrappy(fn, cb) {
  for (const k of Object.keys(fn)) {
    cb[k] = fn[k];
  }
  cb.prototype = fn.prototype;
  return cb;
};
