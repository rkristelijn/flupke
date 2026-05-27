// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const isPromise = require("../src/index.js");

describe("is-promise", () => {
  it("should return true for native Promise", () => {
    assert.strictEqual(isPromise(Promise.resolve()), true);
    assert.strictEqual(isPromise(new Promise(() => {})), true);
  });

  it("should return true for thenable objects", () => {
    assert.strictEqual(isPromise({ then: () => {} }), true);
    assert.strictEqual(isPromise({ then: () => {} }), true);
  });

  it("should return true for thenable functions", () => {
    const fn = () => {};
    fn.then = () => {};
    assert.strictEqual(isPromise(fn), true);
  });

  it("should return false for non-promises", () => {
    assert.strictEqual(isPromise(null), false);
    assert.strictEqual(isPromise(undefined), false);
    assert.strictEqual(isPromise(0), false);
    assert.strictEqual(isPromise(""), false);
    assert.strictEqual(isPromise({}), false);
    assert.strictEqual(isPromise({ then: true }), false);
    assert.strictEqual(isPromise([]), false);
  });
});
