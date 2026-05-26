const { test } = require("node:test");
const assert = require("node:assert/strict");
const { Buffer: SafeBuffer } = require("../src/index.js");

test("Buffer.from works", () => {
  const buf = SafeBuffer.from("hello");
  assert.equal(buf.toString(), "hello");
});

test("Buffer.alloc zeroes memory", () => {
  const buf = SafeBuffer.alloc(10);
  assert.equal(buf.length, 10);
  for (let i = 0; i < 10; i++) assert.equal(buf[i], 0);
});

test("Buffer.allocUnsafe returns correct size", () => {
  const buf = SafeBuffer.allocUnsafe(16);
  assert.equal(buf.length, 16);
});

test("Buffer.from rejects numbers (no uninitialized memory)", () => {
  assert.throws(() => SafeBuffer.from(10), TypeError);
});

test("API compatible with original safe-buffer", () => {
  assert.equal(typeof SafeBuffer.from, "function");
  assert.equal(typeof SafeBuffer.alloc, "function");
  assert.equal(typeof SafeBuffer.allocUnsafe, "function");
});
