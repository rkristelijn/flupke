const { it } = require("node:test");
const assert = require("node:assert/strict");
const lev = require("../src/index.js");
it("same strings", () => {
  assert.strictEqual(lev.get("abc", "abc"), 0);
});
it("one edit", () => {
  assert.strictEqual(lev.get("abc", "ab"), 1);
});
it("different", () => {
  assert.strictEqual(lev.get("kitten", "sitting"), 3);
});
it("empty", () => {
  assert.strictEqual(lev.get("", "abc"), 3);
});
