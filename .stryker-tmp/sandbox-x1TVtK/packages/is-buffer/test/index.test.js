// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const isBuffer = require("../src/index.js");

test("Buffer.from is buffer", () => {
  assert.equal(isBuffer(Buffer.from("hi")), true);
});
test("Buffer.alloc is buffer", () => {
  assert.equal(isBuffer(Buffer.alloc(4)), true);
});
test("string is not buffer", () => {
  assert.equal(isBuffer("hello"), false);
});
test("number is not buffer", () => {
  assert.equal(isBuffer(42), false);
});
test("null is not buffer", () => {
  assert.equal(isBuffer(null), false);
});
test("Uint8Array is not buffer", () => {
  assert.equal(isBuffer(new Uint8Array(4)), false);
});
