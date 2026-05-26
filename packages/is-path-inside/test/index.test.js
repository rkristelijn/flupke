const { it } = require("node:test");
const assert = require("node:assert/strict");
const isPathInside = require("../src/index.js");
it("inside", () => {
  assert.strictEqual(isPathInside("/a/b/c", "/a/b"), true);
});
it("not inside", () => {
  assert.strictEqual(isPathInside("/a/b", "/a/b/c"), false);
});
it("same", () => {
  assert.strictEqual(isPathInside("/a/b", "/a/b"), false);
});
it("sibling", () => {
  assert.strictEqual(isPathInside("/a/c", "/a/b"), false);
});
