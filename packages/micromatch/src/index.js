const picomatch = require("../../picomatch/src/index.js");
const braces = require("../../braces/src/index.js");

function expandBraces(pattern) {
  if (!pattern.includes("{")) return [pattern];
  return braces(pattern, { expand: true });
}

function micromatch(list, patterns, options) {
  const pats = Array.isArray(patterns) ? patterns : [patterns];
  const results = new Set();
  const negated = [];
  const positive = [];

  for (const p of pats) {
    if (p.startsWith("!")) negated.push(p.slice(1));
    else positive.push(p);
  }

  for (const p of positive) {
    for (const expanded of expandBraces(p)) {
      const isMatch = picomatch(expanded, options);
      for (const item of list) {
        if (isMatch(item)) results.add(item);
      }
    }
  }

  for (const p of negated) {
    for (const expanded of expandBraces(p)) {
      const isMatch = picomatch(expanded, options);
      for (const item of results) {
        if (isMatch(item)) results.delete(item);
      }
    }
  }

  return [...results];
}

micromatch.isMatch = (str, pattern, options) => {
  const pats = Array.isArray(pattern) ? pattern : [pattern];
  for (const p of pats) {
    for (const expanded of expandBraces(p)) {
      if (picomatch.isMatch(str, expanded, options)) return true;
    }
  }
  return false;
};

micromatch.not = (list, patterns, options) => {
  const matches = new Set(micromatch(list, patterns, options));
  return list.filter((item) => !matches.has(item));
};

micromatch.match = micromatch;

micromatch.contains = (str, pattern, options) => {
  for (const expanded of expandBraces(pattern)) {
    if (
      picomatch.isMatch(str, `**/${expanded}/**`, options) ||
      picomatch.isMatch(str, `**/${expanded}`, options) ||
      picomatch.isMatch(str, expanded, options)
    )
      return true;
  }
  return false;
};

micromatch.makeRe = (pattern, options) => picomatch.makeRe(pattern, options);

micromatch.braces = braces;

module.exports = micromatch;
