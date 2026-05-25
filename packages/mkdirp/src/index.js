/**
 * @flupkejs/mkdirp — mkdirp
 * @see https://www.npmjs.com/package/mkdirp
 */
const fs = require("node:fs");
const fsp = require("node:fs/promises");
module.exports = async function mkdirp(p) {
  await fsp.mkdir(p, { recursive: true });
  return p;
};
module.exports.sync = function mkdirpSync(p) {
  fs.mkdirSync(p, { recursive: true });
  return p;
};
