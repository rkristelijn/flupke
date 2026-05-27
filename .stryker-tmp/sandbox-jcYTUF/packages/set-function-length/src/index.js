// @ts-nocheck
module.exports = function setFunctionLength(fn, length) {
  Object.defineProperty(fn, "length", {
    value: length,
    writable: false,
    enumerable: false,
    configurable: true,
  });
  return fn;
};
