// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const onFinished = require("../src/index.js");

describe("on-finished", () => {
  it("should call listener immediately if already finished", (t, done) => {
    let called = false;
    const msg = { finished: true };
    onFinished(msg, () => {
      called = true;
    });
    // Listener is called via setImmediate
    setImmediate(() => {
      assert.strictEqual(called, true);
      done();
    });
  });

  it("should call listener when response finishes", (t, done) => {
    let called = false;
    const msg = {};
    onFinished(msg, () => {
      called = true;
    });
    assert.strictEqual(called, false);
    msg.finished = true;
    onFinished.emit(msg);
    setImmediate(() => {
      assert.strictEqual(called, true);
      done();
    });
  });

  it("should return abort function", () => {
    const msg = {};
    const abort = onFinished(msg, () => {});
    assert.strictEqual(typeof abort, "function");
  });

  it("isFinished", () => {
    assert.strictEqual(onFinished.isFinished({ finished: true }), true);
    assert.strictEqual(onFinished.isFinished({ finished: false }), false);
    assert.strictEqual(onFinished.isFinished({ writableFinished: true }), true);
    assert.strictEqual(onFinished.isFinished({}), false);
  });

  it("should throw on non-function listener", () => {
    assert.throws(() => onFinished({}, "not a function"), TypeError);
  });

  it("should handle multiple listeners", (t, done) => {
    let count = 0;
    const msg = {};
    onFinished(msg, () => {
      count++;
    });
    onFinished(msg, () => {
      count++;
    });
    msg.finished = true;
    onFinished.emit(msg);
    setImmediate(() => {
      assert.strictEqual(count, 2);
      done();
    });
  });
});
