const { test } = require("node:test");
const assert = require("node:assert/strict");
const strip = require("../src/index.js");
test("strips common indent", () => {
  assert.equal(strip("  a\n  b"), "a\nb");
});
test("mixed indent", () => {
  assert.equal(strip("    a\n  b"), "  a\nb");
});
test("no indent", () => {
  assert.equal(strip("a\nb"), "a\nb");
});
