const { test } = require("node:test");
const assert = require("node:assert/strict");
const deprecate = require("../src/index.js");

test("is a function", () => {
  assert.equal(typeof deprecate, "function");
});

test("returns a function", () => {
  const fn = () => 1;
  const deprecated = deprecate(fn, "deprecated");
  assert.equal(typeof deprecated, "function");
});
