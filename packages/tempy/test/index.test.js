const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const tempy = require("../src/index.js");
test("file returns path", () => {
  assert.ok(tempy.file().length > 0);
});
test("file with extension", () => {
  assert.ok(tempy.file({ extension: "txt" }).endsWith(".txt"));
});
test("directory creates dir", () => {
  const d = tempy.directory();
  assert.ok(fs.existsSync(d));
  fs.rmdirSync(d);
});
