'use strict';
function parse(str, options) {
  if (!str) return {};
  if (str[0] === '?') str = str.slice(1);
  var result = {};
  var params = new URLSearchParams(str);
  params.forEach(function(val, key) {
    if (key in result) {
      if (!Array.isArray(result[key])) result[key] = [result[key]];
      result[key].push(val);
    } else {
      result[key] = val;
    }
  });
  return result;
}

function stringify(obj, options) {
  if (!obj) return '';
  var params = new URLSearchParams();
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];
    if (val === null || val === undefined) continue;
    if (Array.isArray(val)) {
      for (var j = 0; j < val.length; j++) params.append(key, String(val[j]));
    } else {
      params.append(key, String(val));
    }
  }
  return params.toString();
}

module.exports = { parse, stringify };
