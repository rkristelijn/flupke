// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const equal = require("../src/index.js");
test("primitives", () => {
  assert.ok(equal(1, 1));
  assert.ok(!equal(1, 2));
  assert.ok(equal("a", "a"));
});
test("objects", () => {
  assert.ok(equal({ a: 1 }, { a: 1 }));
  assert.ok(!equal({ a: 1 }, { a: 2 }));
});
test("arrays", () => {
  assert.ok(equal([1, 2], [1, 2]));
  assert.ok(!equal([1], [1, 2]));
});
test("nested", () => {
  assert.ok(equal({ a: { b: [1] } }, { a: { b: [1] } }));
});
test("NaN", () => {
  assert.ok(equal(Number.NaN, Number.NaN));
});
