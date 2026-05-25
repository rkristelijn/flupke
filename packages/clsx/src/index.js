/**
 * @flupkejs/clsx — Drop-in replacement for clsx — conditional class strings
 * @see https://www.npmjs.com/package/clsx
 */
'use strict';
// Implementation: native-first, zero dependencies
module.exports = function classnames(...args) {
  var result = '';
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (!arg) continue;
    if (typeof arg === 'string') {
      result = result ? result + ' ' + arg : arg;
    } else if (Array.isArray(arg)) {
      var inner = classnames.apply(null, arg);
      if (inner) result = result ? result + ' ' + inner : inner;
    } else if (typeof arg === 'object') {
      for (var key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
          result = result ? result + ' ' + key : key;
        }
      }
    }
  }
  return result;
};
