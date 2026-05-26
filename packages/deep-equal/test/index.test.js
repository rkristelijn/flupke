const { test } = require("node:test");
const assert = require("node:assert/strict");
const deepEqual = require("../src/index.js");

test("is a function", () => {
  assert.equal(typeof deepEqual, "function");
});

test("returns true for equal values", () => {
  assert.strictEqual(deepEqual(1, 1), true);
  assert.strictEqual(deepEqual("a", "a"), true);
  assert.strictEqual(deepEqual([1, 2], [1, 2]), true);
  assert.strictEqual(deepEqual({ a: 1 }, { a: 1 }), true);
});

test("returns false for different values", () => {
  assert.strictEqual(deepEqual(1, 2), false);
  assert.strictEqual(deepEqual([1], [1, 2]), false);
});
