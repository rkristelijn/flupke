const { test } = require("node:test");
const assert = require("node:assert/strict");
const isArray = require("../src/index.js");

test("returns true for arrays", () => {
  assert.equal(isArray([]), true);
  assert.equal(isArray([1, 2, 3]), true);
  assert.equal(isArray(new Array()), true);
  assert.equal(isArray(Array.prototype), true);
});

test("returns false for non-arrays", () => {
  assert.equal(isArray(undefined), false);
  assert.equal(isArray(null), false);
  assert.equal(isArray(0), false);
  assert.equal(isArray(""), false);
  assert.equal(isArray("hello"), false);
  assert.equal(isArray({}), false);
  assert.equal(isArray({ length: 0 }), false);
  assert.equal(isArray(arguments), false);
  assert.equal(isArray(Buffer.from("")), false);
});

test("API compatible with original isarray", () => {
  // Original isarray exports a single function
  assert.equal(typeof isArray, "function");
});
