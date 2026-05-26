const { test } = require("node:test");
const assert = require("node:assert/strict");
const slash = require("../src/index.js");

test("converts backslashes to forward slashes", () => {
  assert.equal(slash("a\\b\\c"), "a/b/c");
  assert.equal(slash("a/b/c"), "a/b/c");
});

test("handles mixed paths", () => {
  assert.equal(slash("C:\\Users\\test"), "C:/Users/test");
});
