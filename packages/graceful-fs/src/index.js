/**
 * @flupkejs/graceful-fs — graceful-fs
 * @see https://www.npmjs.com/package/graceful-fs
 */
const fs = require("node:fs");
module.exports = { ...fs };
const queue = [];
let running = false;
function retry() {
  if (!queue.length) {
    running = false;
    return;
  }
  running = true;
  const { method, args, cb } = queue.shift();
  fs[method](...args, (err, ...res) => {
    if (err && err.code === "EMFILE") {
      queue.unshift({ method, args, cb });
      setTimeout(retry, 1);
    } else {
      cb(err, ...res);
      retry();
    }
  });
}
["open", "readFile", "writeFile", "readdir", "stat", "lstat"].forEach((m) => {
  module.exports[m] = (...args) => {
    const cb = args.pop();
    queue.push({ method: m, args, cb });
    if (!running) retry();
  };
});
