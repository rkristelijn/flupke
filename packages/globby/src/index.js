/**
 * @flupkejs/globby — globby
 * @see https://www.npmjs.com/package/globby
 */
const fs = require("node:fs");
const path = require("node:path");
module.exports = function globby(patterns, opts = {}) {
  const cwd = opts.cwd || process.cwd();
  if (typeof patterns === "string") patterns = [patterns];
  const results = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = path.relative(cwd, full);
      if (
        entry.isDirectory() &&
        !entry.name.startsWith(".") &&
        entry.name !== "node_modules"
      )
        walk(full);
      else if (
        entry.isFile() &&
        patterns.some((p) => {
          const ext = p.replace("**/*", "");
          return rel.endsWith(ext) || p === "*";
        })
      )
        results.push(rel);
    }
  }
  walk(cwd);
  return results;
};
