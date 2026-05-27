// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pathExists = require("../src/index.js");
test("existing file", async () => {
  assert.equal(await pathExists(__filename), true);
});
test("non-existing", async () => {
  assert.equal(await pathExists("/nope/nope"), false);
});
test("sync", () => {
  assert.equal(pathExists.sync(__filename), true);
  assert.equal(pathExists.sync("/nope"), false);
});
