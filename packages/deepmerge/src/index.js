/** Deep merge two objects recursively */
function deepmerge(target, source, options) {
  if (!source) return target;
  if (Array.isArray(source)) {
    if (options?.arrayMerge) return options.arrayMerge(target, source, options);
    return Array.isArray(target) ? [...target, ...source] : source.slice();
  }
  const result = {};
  let keys = Object.keys(target);
  for (let i = 0; i < keys.length; i++) result[keys[i]] = target[keys[i]];
  keys = Object.keys(source);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const val = source[key];
    if (
      val &&
      typeof val === "object" &&
      !Array.isArray(val) &&
      result[key] &&
      typeof result[key] === "object" &&
      !Array.isArray(result[key])
    ) {
      result[key] = deepmerge(result[key], val, options);
    } else if (Array.isArray(val) && Array.isArray(result[key])) {
      if (options?.arrayMerge)
        result[key] = options.arrayMerge(result[key], val, options);
      else result[key] = result[key].concat(val);
    } else {
      result[key] = val;
    }
  }
  return result;
}
deepmerge.all = (arr, options) =>
  arr.reduce((acc, obj) => deepmerge(acc, obj, options), {});
// Public API
module.exports = deepmerge;
