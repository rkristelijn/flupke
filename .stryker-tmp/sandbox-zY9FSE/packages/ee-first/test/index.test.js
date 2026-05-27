// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
const first = require("../src/index.js");
describe("ee-first", () => {
  it("should call done on first event", (t, done) => {
    const ee = new EventEmitter();
    first([[ee, "a", "b"]], (err, emitter, event) => {
      assert.strictEqual(event, "a");
      done();
    });
    ee.emit("a");
  });
  it("should cleanup listeners", () => {
    const ee = new EventEmitter();
    let called = 0;
    const cancel = first([[ee, "a"]], () => {
      called++;
    });
    cancel();
    ee.emit("a");
    assert.strictEqual(called, 0);
  });
});
