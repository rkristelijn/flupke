const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const safer = require("../src/index.js");

describe("safer-buffer", () => {
  it("should export Buffer.from", () => {
    const buf = safer.Buffer.from("hello");
    assert.strictEqual(buf.toString(), "hello");
  });

  it("should export Buffer.alloc", () => {
    const buf = safer.Buffer.alloc(5);
    assert.strictEqual(buf.length, 5);
  });

  it("should not have allocUnsafe", () => {
    assert.strictEqual(safer.Buffer.allocUnsafe, undefined);
  });

  it("should not have allocUnsafeSlow", () => {
    assert.strictEqual(safer.Buffer.allocUnsafeSlow, undefined);
  });

  it("should throw when used as constructor", () => {
    assert.throws(() => new safer.Buffer(10), Error);
    assert.throws(() => new safer.Buffer("hello"), Error);
  });

  it("should export Buffer.isBuffer", () => {
    assert.strictEqual(safer.Buffer.isBuffer(safer.Buffer.from("x")), true);
    assert.strictEqual(safer.Buffer.isBuffer("x"), false);
  });
});
