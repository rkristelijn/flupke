// @ts-nocheck
const { it } = require("node:test");
const assert = require("node:assert/strict");
const hash = require("../src/index.js");
it("returns number", () => {
  assert.strictEqual(typeof hash("hello"), "number");
});
it("consistent", () => {
  assert.strictEqual(hash("test"), hash("test"));
});
it("different for different input", () => {
  assert.notStrictEqual(hash("a"), hash("b"));
});
