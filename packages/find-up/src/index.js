const path = require('node:path');
const fs = require('node:fs/promises');
module.exports = async function findUp(name, opts = {}) {
  let dir = path.resolve(opts.cwd || '.');
  while (true) {
    const fp = path.join(dir, name);
    try { await fs.access(fp); return fp; } catch {}
    const parent = path.dirname(dir);
    if (parent === dir) return;
    dir = parent;
  }
};
