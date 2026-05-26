const { test } = require("node:test");
const assert = require("node:assert/strict");
const bind = require("../src/index.js");

test("binds context", () => {
  const obj = { x: 42 };
  function getX() {
    return this.x;
  }
  const bound = bind.call(getX, obj);
  assert.equal(bound(), 42);
});

test("binds arguments", () => {
  function add(a, b) {
    return a + b;
  }
  const add5 = bind.call(add, null, 5);
  assert.equal(add5(3), 8);
});

test("works as constructor", () => {
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  const PointAt0 = bind.call(Point, null, 0);
  const p = new PointAt0(5);
  assert.equal(p.x, 0);
  assert.equal(p.y, 5);
});

test("API compatible with function-bind package", () => {
  assert.equal(typeof bind, "function");
  assert.equal(bind, Function.prototype.bind);
});
