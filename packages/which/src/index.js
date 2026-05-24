const path = require('node:path');
const fs = require('node:fs');
module.exports = function which(cmd) {
  const dirs = (process.env.PATH || '').split(path.delimiter);
  for (const dir of dirs) {
    const full = path.join(dir, cmd);
    try { fs.accessSync(full, fs.constants.X_OK); return full; } catch {}
  }
  throw new Error(`not found: ${cmd}`);
};
module.exports.sync = module.exports;
