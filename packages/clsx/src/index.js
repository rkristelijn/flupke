// Implementation: native-first, zero dependencies
module.exports = function classnames(...args) {
  let result = "";
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
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
