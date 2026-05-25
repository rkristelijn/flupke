'use strict';
exports.parse = function parse(str, options) {
  var obj = {};
  if (!str || typeof str !== 'string') return obj;
  var dec = (options && options.decode) || decodeURIComponent;
  var pairs = str.split(';');
  for (var i = 0; i < pairs.length; i++) {
    var idx = pairs[i].indexOf('=');
    if (idx < 0) continue;
    var key = pairs[i].substring(0, idx).trim();
    var val = pairs[i].substring(idx + 1).trim();
    if (val[0] === '"') val = val.slice(1, -1);
    if (obj[key] === undefined) {
      try { obj[key] = dec(val); } catch { obj[key] = val; }
    }
  }
  return obj;
};

exports.serialize = function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encodeURIComponent;
  var str = name + '=' + enc(val);
  if (opt.maxAge != null) str += '; Max-Age=' + Math.floor(opt.maxAge);
  if (opt.domain) str += '; Domain=' + opt.domain;
  if (opt.path) str += '; Path=' + opt.path;
  if (opt.expires) str += '; Expires=' + opt.expires.toUTCString();
  if (opt.httpOnly) str += '; HttpOnly';
  if (opt.secure) str += '; Secure';
  if (opt.sameSite) str += '; SameSite=' + (typeof opt.sameSite === 'string' ? opt.sameSite : 'Strict');
  if (opt.priority) str += '; Priority=' + opt.priority;
  return str;
};
