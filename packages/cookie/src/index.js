/** Parse a cookie header string into key-value pairs */
exports.parse = function parse(str, options) {
  const obj = {};
  if (!str || typeof str !== "string") return obj;
  const dec = options?.decode || decodeURIComponent;
  const pairs = str.split(";");
  for (let i = 0; i < pairs.length; i++) {
    const idx = pairs[i].indexOf("=");
    if (idx < 0) continue;
    const key = pairs[i].substring(0, idx).trim();
    let val = pairs[i].substring(idx + 1).trim();
    if (val[0] === '"') val = val.slice(1, -1);
    if (obj[key] === undefined) {
      try {
        obj[key] = dec(val);
      } catch {
        obj[key] = val;
      }
    }
  }
  return obj;
};

/** Serialize a cookie name-value pair into a Set-Cookie header string */
exports.serialize = function serialize(name, val, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  let str = `${name}=${enc(val)}`;
  if (opt.maxAge != null) str += `; Max-Age=${Math.floor(opt.maxAge)}`;
  if (opt.domain) str += `; Domain=${opt.domain}`;
  if (opt.path) str += `; Path=${opt.path}`;
  if (opt.expires) str += `; Expires=${opt.expires.toUTCString()}`;
  if (opt.httpOnly) str += "; HttpOnly";
  if (opt.secure) str += "; Secure";
  if (opt.sameSite)
    str += `; SameSite=${typeof opt.sameSite === "string" ? opt.sameSite : "Strict"}`;
  if (opt.priority) str += `; Priority=${opt.priority}`;
  return str;
};
