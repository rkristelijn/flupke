// @ts-nocheck
const fs = require("node:fs");
const path = require("node:path");
const minimatch = require("../../minimatch/src/index.js");

function glob(pattern, options, cb) {
  let callback = cb;
  let opts = options || {};
  if (typeof options === "function") {
    callback = options;
    opts = {};
  }
  const promise = globAsync(pattern, opts);
  if (callback) {
    promise.then((r) => callback(null, r), callback);
    return;
  }
  return promise;
}

async function globAsync(pattern, opts) {
  const cwd = opts.cwd || process.cwd();
  const dot = opts.dot || false;
  const nodir = opts.nodir || false;
  const ignore = opts.ignore || [];

  const files = await walk(cwd, opts);
  const relative = files.map((f) => path.relative(cwd, f).replace(/\\/g, "/"));

  const matched = relative.filter((f) => {
    if (!dot && f.split("/").some((p) => p.startsWith("."))) return false;
    if (!minimatch(f, pattern, { dot })) return false;
    if (ignore.some((ig) => minimatch(f, ig, { dot }))) return false;
    return true;
  });

  if (nodir) {
    const result = [];
    for (const f of matched) {
      const full = path.join(cwd, f);
      try {
        if (!fs.statSync(full).isDirectory()) result.push(f);
      } catch {
        result.push(f);
      }
    }
    return result;
  }

  return matched;
}

async function walk(dir, opts, results = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    results.push(full);
    if (entry.isDirectory()) await walk(full, opts, results);
  }
  return results;
}

function globSync(pattern, options) {
  const opts = options || {};
  const cwd = opts.cwd || process.cwd();
  const dot = opts.dot || false;
  const nodir = opts.nodir || false;
  const ignore = opts.ignore || [];

  const files = [];
  walkSync(cwd, files);
  const relative = files.map((f) => path.relative(cwd, f).replace(/\\/g, "/"));

  const matched = relative.filter((f) => {
    if (!dot && f.split("/").some((p) => p.startsWith("."))) return false;
    if (!minimatch(f, pattern, { dot })) return false;
    if (ignore.some((ig) => minimatch(f, ig, { dot }))) return false;
    return true;
  });

  if (nodir)
    return matched.filter((f) => {
      try {
        return !fs.statSync(path.join(cwd, f)).isDirectory();
      } catch {
        return true;
      }
    });
  return matched;
}

function walkSync(dir, results) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    results.push(full);
    if (entry.isDirectory()) walkSync(full, results);
  }
}

glob.sync = globSync;
glob.glob = glob;
glob.Glob = function Glob(p, o, cb) {
  return glob(p, o, cb);
};

module.exports = glob;
