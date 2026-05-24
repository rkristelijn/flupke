const fs = require('node:fs');
const fsp = require('node:fs/promises');
module.exports = async function pathExists(p) { try { await fsp.access(p); return true; } catch { return false; } };
module.exports.sync = function pathExistsSync(p) { try { fs.accessSync(p); return true; } catch { return false; } };
