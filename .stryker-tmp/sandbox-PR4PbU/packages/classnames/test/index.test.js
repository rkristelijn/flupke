// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const classnames = require("../src/index.js");

test("joins strings", () => {
  assert.equal(classnames("a", "b"), "a b");
});

test("filters falsy values", () => {
  assert.equal(classnames("a", null, "b", undefined, "c"), "a b c");
});

test("handles objects", () => {
  assert.equal(classnames({ a: true, b: false, c: true }), "a c");
});

test("handles nested arrays", () => {
  assert.equal(classnames(["a", "b"], ["c"]), "a b c");
});
