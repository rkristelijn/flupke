function picomatch(glob, opts) {
  const re = globToRegex(glob, opts);
  const fn = (str) => re.test(str);
  fn.regex = re;
  return fn;
}
picomatch.isMatch = (str, glob, opts) => picomatch(glob, opts)(str);
picomatch.makeRe = (glob, opts) => globToRegex(glob, opts);
picomatch.test = (str, regex) => regex.test(str);

function globToRegex(glob, opts) {
  const flags = opts?.nocase ? "i" : "";
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        re += ".*";
        i++;
        if (glob[i + 1] === "/") i++;
      } else re += "[^/]*";
    } else if (c === "?") {
      re += "[^/]";
    } else if (c === "{") {
      const end = glob.indexOf("}", i);
      if (end > i) {
        re += `(?:${glob.slice(i + 1, end).replace(/,/g, "|")})`;
        i = end;
      } else re += "\\{";
    } else if (".+^$|()[]\\".indexOf(c) !== -1) {
      re += `\\${c}`;
    } else {
      re += c;
    }
  }
  return new RegExp(`^${re}$`, flags);
}

module.exports = picomatch;
