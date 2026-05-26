const { test } = require("node:test");
const assert = require("node:assert/strict");
const hasOwn = require("../src/index.js");

test("is a function", () => {
  assert.equal(typeof hasOwn, "function");
});

test("returns true for own property", () => {
  assert.equal(hasOwn({ a: 1 }, "a"), true);
});

test("returns false for inherited property", () => {
  assert.equal(hasOwn({}, "hasOwn"), false);
});
