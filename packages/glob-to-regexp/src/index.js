module.exports = function globToRegexp(glob, opts) {
  const flags = opts?.flags || "";
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        re += ".*";
        i++;
        if (glob[i + 1] === "/") i++;
      } else re += "[^/]*";
    } else if (c === "?") re += "[^/]";
    else if (".+^${}()|[]\\".indexOf(c) !== -1) re += `\\${c}`;
    else re += c;
  }
  return new RegExp(`^${re}$`, flags);
};
