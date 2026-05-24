'use strict';
function deepmerge(target, source, options) {
  if (!source) return target;
  if (Array.isArray(source)) {
    if (options && options.arrayMerge) return options.arrayMerge(target, source, options);
    return Array.isArray(target) ? [...target, ...source] : source.slice();
  }
  var result = {};
  var keys = Object.keys(target);
  for (var i = 0; i < keys.length; i++) result[keys[i]] = target[keys[i]];
  keys = Object.keys(source);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = source[key];
    if (val && typeof val === 'object' && !Array.isArray(val) && result[key] && typeof result[key] === 'object') {
      result[key] = deepmerge(result[key], val, options);
    } else {
      result[key] = val;
    }
  }
  return result;
}
deepmerge.all = function(arr, options) {
  return arr.reduce(function(acc, obj) { return deepmerge(acc, obj, options); }, {});
};
module.exports = deepmerge;
