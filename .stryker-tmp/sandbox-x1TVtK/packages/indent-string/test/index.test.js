// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const indent = require("../src/index.js");
test("default", () => {
  assert.equal(indent("a\nb", 2), "  a\n  b");
});
test("custom indent", () => {
  assert.equal(indent("a", 1, { indent: "\t" }), "\ta");
});
test("zero", () => {
  assert.equal(indent("a", 0), "a");
});
