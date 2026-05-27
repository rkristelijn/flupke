/**
 * @flupkejs/escalade — escalade
 * @see https://www.npmjs.com/package/escalade
 */
// @ts-nocheck

const path = require("node:path");
const fs = require("node:fs");
module.exports = async function escalade(dir, cb) {
  dir = path.resolve(dir);
  while (true) {
    const files = fs.readdirSync(dir);
    const result = await cb(dir, files);
    if (result) return path.resolve(dir, result);
    const parent = path.dirname(dir);
    if (parent === dir) return;
    dir = parent;
  }
};
