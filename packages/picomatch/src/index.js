function picomatch(glob, opts) {
  let re = globToRegex(glob, opts);
  let fn = function(str) { return re.test(str); };
  fn.regex = re;
  return fn;
}
picomatch.isMatch = function(str, glob, opts) { return picomatch(glob, opts)(str); };
picomatch.makeRe = function(glob, opts) { return globToRegex(glob, opts); };
picomatch.test = function(str, regex) { return regex.test(str); };

function globToRegex(glob, opts) {
  let flags = (opts && opts.nocase) ? 'i' : '';
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    let c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') { re += '.*'; i++; if (glob[i + 1] === '/') i++; }
      else re += '[^/]*';
    } else if (c === '?') {
      re += '[^/]';
    } else if (c === '{') {
      let end = glob.indexOf('}', i);
      if (end > i) { re += '(?:' + glob.slice(i + 1, end).replace(/,/g, '|') + ')'; i = end; }
      else re += '\\{';
    } else if ('.+^$|()[]\\'.indexOf(c) !== -1) {
      re += '\\' + c;
    } else {
      re += c;
    }
  }
  return new RegExp('^' + re + '$', flags);
}

module.exports = picomatch;
