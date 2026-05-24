const fs = require('node:fs/promises');
exports.isFile = async (p) => { try { return (await fs.stat(p)).isFile(); } catch { return false; } };
exports.isDirectory = async (p) => { try { return (await fs.stat(p)).isDirectory(); } catch { return false; } };
exports.isSymlink = async (p) => { try { return (await fs.lstat(p)).isSymbolicLink(); } catch { return false; } };
