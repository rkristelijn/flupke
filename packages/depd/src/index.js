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
  deprecate.function = (fn, message) => {
    if (!fn) return fn;
    const msg = `${namespace}: ${message || `${fn.name} is deprecated`}`;
    let warned = false;
    function deprecated() {
      if (!warned) {
        warned = true;
        if (!process.noDeprecation) console.warn(msg);
      }
      return fn.apply(this, arguments);
    }
    deprecated.prototype = fn.prototype;
    Object.setPrototypeOf(deprecated, fn);
    return deprecated;
  };
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
