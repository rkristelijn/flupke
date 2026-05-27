// @ts-nocheck
const path = require("node:path");
const fs = require("node:fs");
module.exports = function escaladeSync(dir, cb) {
  dir = path.resolve(dir);
  while (true) {
    const files = fs.readdirSync(dir);
    const result = cb(dir, files);
    if (result) return path.resolve(dir, result);
    const parent = path.dirname(dir);
    if (parent === dir) return;
    dir = parent;
  }
};
