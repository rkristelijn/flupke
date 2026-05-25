/**
 * @flupkejs/tempy — tempy
 * @see https://www.npmjs.com/package/tempy
 */
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const fs = require('node:fs');
exports.file = function (opts = {}) { return path.join(os.tmpdir(), crypto.randomUUID() + (opts.extension ? '.' + opts.extension : '')); };
exports.directory = function () { const d = path.join(os.tmpdir(), crypto.randomUUID()); fs.mkdirSync(d); return d; };
