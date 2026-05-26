const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const rimraf = require("../src/index.js");
test("removes directory", async () => {
  const d = path.join(__dirname, "_tmp");
  fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, "f"), "x");
  await rimraf(d);
  assert.equal(fs.existsSync(d), false);
});
test("sync removes", () => {
  const d = path.join(__dirname, "_tmp2");
  fs.mkdirSync(d);
  rimraf.sync(d);
  assert.equal(fs.existsSync(d), false);
});
test("no error on missing", async () => {
  await assert.doesNotReject(rimraf(path.join(__dirname, "_nonexistent")));
});
