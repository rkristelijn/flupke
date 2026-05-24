const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const execFileAsync = promisify(execFile);
module.exports = async function execa(cmd, args = [], opts = {}) {
  const { stdout, stderr } = await execFileAsync(cmd, args, opts);
  return { stdout: stdout.trim(), stderr: stderr.trim(), exitCode: 0 };
};
module.exports.sync = function execaSync(cmd, args = [], opts = {}) {
  const { execFileSync } = require('node:child_process');
  const stdout = execFileSync(cmd, args, { ...opts, encoding: 'utf8' });
  return { stdout: stdout.trim(), stderr: '', exitCode: 0 };
};
