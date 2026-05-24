'use strict';
module.exports = function classnames() {
  const args = [].slice.call(arguments).flat();
  const result = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === 'string') result.push(arg);
    else if (typeof arg === 'object') {
      for (const key of Object.keys(arg)) {
        if (arg[key]) result.push(key);
      }
    }
  }
  return result.join(' ');
};