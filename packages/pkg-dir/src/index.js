/**
 * @flupkejs/pkg-dir — pkg-dir
 * @see https://www.npmjs.com/package/pkg-dir
 */
const path = require("node:path");
const fs = require("node:fs/promises");
module.exports = async function pkgDir(cwd = ".") {
  let dir = path.resolve(cwd);
  while (true) {
    try {
      await fs.access(path.join(dir, "package.json"));
      return dir;
    } catch {}
    const p = path.dirname(dir);
    if (p === dir) return;
    dir = p;
  }
};

module.exports.sync = function pkgDirSync(cwd = ".") {
  let dir = path.resolve(cwd);
  const { existsSync } = require("node:fs");
  while (true) {
    if (existsSync(path.join(dir, "package.json"))) return dir;
    const p = path.dirname(dir);
    if (p === dir) return;
    dir = p;
  }
};
