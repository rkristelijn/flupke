const path = require('node:path');
const fs = require('node:fs/promises');
module.exports = async function pkgDir(cwd = '.') {
  let dir = path.resolve(cwd);
  while (true) {
    try { await fs.access(path.join(dir, 'package.json')); return dir; } catch {}
    const p = path.dirname(dir);
    if (p === dir) return;
    dir = p;
  }
};
