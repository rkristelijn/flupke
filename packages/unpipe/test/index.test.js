const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { Readable, Writable } = require("node:stream");
const unpipe = require("../src/index.js");

describe("unpipe", () => {
  it("should throw on missing stream argument", () => {
    assert.throws(() => unpipe(), TypeError);
    assert.throws(() => unpipe(null), TypeError);
    assert.throws(() => unpipe(undefined), TypeError);
  });

  it("should call stream.unpipe() if available", () => {
    let called = false;
    const stream = {
      unpipe: () => {
        called = true;
      },
    };
    unpipe(stream);
    assert.strictEqual(called, true);
  });

  it("should not throw if stream has no unpipe method", () => {
    assert.doesNotThrow(() => unpipe({}));
  });

  it("should work with real streams", () => {
    const readable = new Readable({ read() {} });
    const writable = new Writable({
      write(chunk, enc, cb) {
        cb();
      },
    });
    readable.pipe(writable);
    assert.doesNotThrow(() => unpipe(readable));
  });
});
