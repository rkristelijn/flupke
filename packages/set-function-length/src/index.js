/**
 * @flupkejs/set-function-length — Set function length property
 * @see https://www.npmjs.com/package/set-function-length
 */
'use strict';
module.exports = function setFunctionLength(fn, length) {
  Object.defineProperty(fn, 'length', { value: length, writable: false, enumerable: false, configurable: true });
  return fn;
};