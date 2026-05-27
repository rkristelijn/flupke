// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const isGlob = require("../src/index.js");
test("globs", () => {
  assert.equal(isGlob("*.js"), true);
  assert.equal(isGlob("foo?"), true);
  assert.equal(isGlob("{a,b}"), true);
});
test("not globs", () => {
  assert.equal(isGlob("foo.js"), false);
  assert.equal(isGlob("path/to/file"), false);
});
test("edge cases", () => {
  assert.equal(isGlob(""), false);
  assert.equal(isGlob("[abc]"), true);
});
