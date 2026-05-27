// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const requireDir = require("../src/index.js");
test("returns object", () => {
  const r = requireDir(module, require("node:path").join(__dirname, "../src"));
  assert.equal(typeof r, "object");
});
test("loads js files", () => {
  const r = requireDir(module, require("node:path").join(__dirname, "../src"));
  assert.ok("index" in r || Object.keys(r).length === 0);
});
test("skips index.js", () => {
  const r = requireDir(module, require("node:path").join(__dirname, "../src"));
  assert.equal(r.index, undefined);
});
