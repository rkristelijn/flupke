/**
 * @flupkejs/rimraf — rimraf
 * @see https://www.npmjs.com/package/rimraf
 */
// @ts-nocheck

const fs = require("node:fs");
const fsp = require("node:fs/promises");
module.exports = async function rimraf(p) {
  await fsp.rm(p, { recursive: true, force: true });
};
module.exports.sync = function rimrafSync(p) {
  fs.rmSync(p, { recursive: true, force: true });
};
