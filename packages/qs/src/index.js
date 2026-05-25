// Implementation: native-first, zero dependencies
/** Parse a querystring into an object */
function parse(str, options) {
  if (!str) return {};
  if (str[0] === "?") str = str.slice(1);
  const result = {};
  const params = new URLSearchParams(str);
  params.forEach((val, key) => {
    if (key in result) {
      if (!Array.isArray(result[key])) result[key] = [result[key]];
      result[key].push(val);
    } else {
      result[key] = val;
    }
  });
  return result;
}

/** Stringify an object into a querystring */
function stringify(obj, options) {
  if (!obj) return "";
  const params = new URLSearchParams();
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const val = obj[key];
    if (val === null || val === undefined) continue;
    if (Array.isArray(val)) {
      for (let j = 0; j < val.length; j++) params.append(key, String(val[j]));
    } else {
      params.append(key, String(val));
    }
  }
  return params.toString();
}

module.exports = { parse, stringify };
