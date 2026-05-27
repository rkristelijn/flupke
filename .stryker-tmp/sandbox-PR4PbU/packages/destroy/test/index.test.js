// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { Readable } = require("node:stream");
const destroy = require("../src/index.js");
describe("destroy", () => {
  it("should destroy a stream", () => {
    const s = new Readable({ read() {} });
    destroy(s);
    assert.strictEqual(s.destroyed, true);
  });
  it("should return the stream", () => {
    const s = new Readable({ read() {} });
    assert.strictEqual(destroy(s), s);
  });
  it("should handle null", () => {
    assert.strictEqual(destroy(null), null);
  });
});
