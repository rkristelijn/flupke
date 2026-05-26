const { test } = require("node:test");
const assert = require("node:assert/strict");
const once = require("../src/index.js");
test("calls function only once", () => {
  let c = 0;
  const fn = once(() => ++c);
  fn();
  fn();
  fn();
  assert.equal(c, 1);
});
test("returns first result", () => {
  const fn = once((x) => x * 2);
  assert.equal(fn(5), 10);
  assert.equal(fn(99), 10);
});
test("preserves this", () => {
  const obj = { x: 1 };
  const fn = once(function () {
    return this.x;
  });
  assert.equal(fn.call(obj), 1);
});
