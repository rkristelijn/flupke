// @ts-nocheck
const { it } = require("node:test");
const assert = require("node:assert/strict");
const EventEmitter = require("../src/index.js");
it("exports EventEmitter", () => {
  assert.strictEqual(typeof EventEmitter, "function");
});
it("works", () => {
  const e = new EventEmitter();
  let x = 0;
  e.on("t", () => x++);
  e.emit("t");
  assert.strictEqual(x, 1);
});
