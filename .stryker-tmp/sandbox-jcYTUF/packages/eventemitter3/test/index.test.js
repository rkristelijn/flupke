// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const EventEmitter = require("../src/index.js");

test("on and emit", () => {
  const ee = new EventEmitter();
  let got;
  ee.on("x", (v) => {
    got = v;
  });
  ee.emit("x", "hi");
  assert.equal(got, "hi");
});
test("once fires once", () => {
  const ee = new EventEmitter();
  let count = 0;
  ee.once("x", () => {
    count++;
  });
  ee.emit("x");
  ee.emit("x");
  assert.equal(count, 1);
});
test("off removes listener", () => {
  const ee = new EventEmitter();
  let count = 0;
  const fn = () => {
    count++;
  };
  ee.on("x", fn);
  ee.off("x", fn);
  ee.emit("x");
  assert.equal(count, 0);
});
test("listeners fire in order", () => {
  const ee = new EventEmitter();
  const order = [];
  ee.on("x", () => order.push(1));
  ee.on("x", () => order.push(2));
  ee.emit("x");
  assert.deepEqual(order, [1, 2]);
});
test("emit returns false if no listeners", () => {
  const ee = new EventEmitter();
  assert.equal(ee.emit("x"), false);
});
test("emit returns true if listeners", () => {
  const ee = new EventEmitter();
  ee.on("x", () => {});
  assert.equal(ee.emit("x"), true);
});
test("removeAllListeners", () => {
  const ee = new EventEmitter();
  ee.on("x", () => {});
  ee.removeAllListeners("x");
  assert.equal(ee.listenerCount("x"), 0);
});
test("listeners returns array", () => {
  const ee = new EventEmitter();
  const fn = () => {};
  ee.on("x", fn);
  assert.deepEqual(ee.listeners("x"), [fn]);
});
