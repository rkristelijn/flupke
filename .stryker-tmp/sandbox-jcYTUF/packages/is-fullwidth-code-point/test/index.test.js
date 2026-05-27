// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const isFW = require("../src/index.js");
test("fullwidth CJK", () => {
  assert.equal(isFW("가".codePointAt(0)), true);
  assert.equal(isFW("中".codePointAt(0)), true);
});
test("halfwidth ASCII", () => {
  assert.equal(isFW("a".codePointAt(0)), false);
  assert.equal(isFW("1".codePointAt(0)), false);
});
test("emoji", () => {
  assert.equal(isFW("🌀".codePointAt(0)), true);
});
