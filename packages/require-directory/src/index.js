/**
 * @flupkejs/require-directory — require-directory
 * @see https://www.npmjs.com/package/require-directory
 */
const path = require("node:path");
const fs = require("node:fs");
module.exports = function requireDirectory(m, dir) {
  dir = dir || path.dirname(m.filename);
  const result = {};
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".js") && f !== "index.js")) {
    result[path.basename(f, ".js")] = require(path.join(dir, f));
  }
  return result;
};
