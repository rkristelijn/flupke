// @ts-nocheck
const braces = require("../../braces/src/index.js");

function minimatch(path, pattern, options) {
  return new Minimatch(pattern, options).match(path);
}

class Minimatch {
  constructor(pattern, options = {}) {
    this.options = options;
    this.pattern = pattern;
    this.negate = false;
    this.set = [];
    this.make();
  }

  make() {
    let pattern = this.pattern.trim();
    if (pattern.startsWith("!")) {
      this.negate = true;
      pattern = pattern.slice(1);
    }

    // Expand braces
    const expanded = pattern.includes("{")
      ? braces(pattern, { expand: true })
      : [pattern];
    this.set = expanded.map((p) => this._makeRe(p));
  }

  _makeRe(pattern) {
    const flags = this.options.nocase ? "i" : "";
    let re = "^";
    let i = 0;

    while (i < pattern.length) {
      const c = pattern[i];
      if (c === "*") {
        if (pattern[i + 1] === "*") {
          re += ".*";
          i += 2;
          if (pattern[i] === "/") {
            i++;
          }
        } else {
          re += "[^/]*";
          i++;
        }
      } else if (c === "?") {
        re += "[^/]";
        i++;
      } else if (c === "[") {
        const end = pattern.indexOf("]", i + 1);
        if (end === -1) {
          re += "\\[";
          i++;
        } else {
          re += pattern.slice(i, end + 1);
          i = end + 1;
        }
      } else if (c === "/") {
        re += "\\/";
        i++;
      } else {
        re += c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        i++;
      }
    }

    re += "$";
    try {
      return new RegExp(re, flags);
    } catch {
      return /(?!)/;
    }
  }

  match(path) {
    const hit = this.set.some((re) => re.test(path));
    return this.negate ? !hit : hit;
  }
}

minimatch.Minimatch = Minimatch;
minimatch.filter = (pattern, options) => (path) =>
  minimatch(path, pattern, options);
minimatch.match = (list, pattern, options) =>
  list.filter((p) => minimatch(p, pattern, options));
minimatch.makeRe = (pattern, options) =>
  new Minimatch(pattern, options).set[0] || /(?!)/;

module.exports = minimatch;
