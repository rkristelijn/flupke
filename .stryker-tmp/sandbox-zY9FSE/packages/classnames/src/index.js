// @ts-nocheck
module.exports = function classnames(...args) {
  let result = "";
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === "string") {
      result = result ? `${result} ${arg}` : arg;
    } else if (Array.isArray(arg)) {
      const inner = classnames.apply(null, arg);
      if (inner) result = result ? `${result} ${inner}` : inner;
    } else if (typeof arg === "object") {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
          result = result ? `${result} ${key}` : key;
        }
      }
    }
  }
  return result;
};
