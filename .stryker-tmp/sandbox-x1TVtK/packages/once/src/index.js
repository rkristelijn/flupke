/**
 * @flupkejs/once — once
 * @see https://www.npmjs.com/package/once
 */
// @ts-nocheck

module.exports = function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
};
