const util = require("node:util");
/** Create a deprecation warning function for a namespace */
module.exports = function depd(namespace) {
  const warned = Object.create(null);
  function deprecate(message) {
    if (warned[message]) return;
    warned[message] = true;
    if (typeof process !== "undefined" && process.noDeprecation) return;
    console.warn(`${namespace}: ${message} is deprecated`);
  }
  deprecate.function = (fn, message) =>
    util.deprecate(
      fn,
      `${namespace}: ${message || `${fn.name} is deprecated`}`,
    );
  deprecate.property = (obj, prop, message) => {
    let val = obj[prop];
    Object.defineProperty(obj, prop, {
      configurable: true,
      get: () => {
        deprecate(message || prop);
        return val;
      },
      set: (v) => {
        val = v;
      },
    });
  };
  return deprecate;
};
