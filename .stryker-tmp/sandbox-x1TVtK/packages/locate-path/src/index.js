/**
 * @flupkejs/locate-path — locate-path
 * @see https://www.npmjs.com/package/locate-path
 */
// @ts-nocheck

const path = require("node:path");
const fs = require("node:fs/promises");
module.exports = async function locatePath(paths, opts = {}) {
  const cwd = opts.cwd || process.cwd();
  for (const p of paths) {
    try {
      await fs.access(path.resolve(cwd, p));
      return p;
    } catch {}
  }
};
