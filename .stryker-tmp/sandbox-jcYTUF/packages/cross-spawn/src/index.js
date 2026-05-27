/**
 * @flupkejs/cross-spawn — cross-spawn
 * @see https://www.npmjs.com/package/cross-spawn
 */
// @ts-nocheck

const { spawn } = require("node:child_process");
module.exports = function crossSpawn(cmd, args = [], opts = {}) {
  return spawn(cmd, args, { ...opts, shell: process.platform === "win32" });
};
module.exports.sync = require("node:child_process").spawnSync;
