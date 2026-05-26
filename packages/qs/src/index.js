// Implementation: native-first, zero dependencies
/** Parse a querystring into an object */
function parse(str, options) {
  if (!str) return {};
  if (str[0] === "?") str = str.slice(1);
  const result = {};
  const params = new URLSearchParams(str);
  for (const [key, val] of params) {
    if (key in result) {
      if (!Array.isArray(result[key])) result[key] = [result[key]];
      result[key].push(val);
    } else {
      result[key] = val;
    }
  }
  return result;
}

/** Stringify an object into a querystring */
function stringify(obj, options) {
  if (!obj) return "";
  const params = new URLSearchParams();
  const keys = Object.keys(obj);
  for (const key of keys) {
    const val = obj[key];
    if (val === null || val === undefined) continue;
    if (Array.isArray(val)) {
      for (const item of val) params.append(key, String(item));
    } else {
      params.append(key, String(val));
    }
  }
  return params.toString();
}

module.exports = { parse, stringify };
