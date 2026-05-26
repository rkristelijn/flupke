const { test } = require("node:test");
const assert = require("node:assert/strict");
const Yallist = require("../src/index.js");
test("push and toArray", () => {
  const l = new Yallist();
  l.push(1);
  l.push(2);
  assert.deepEqual(l.toArray(), [1, 2]);
});
test("pop", () => {
  const l = new Yallist([1, 2, 3]);
  assert.equal(l.pop(), 3);
  assert.equal(l.length, 2);
});
test("shift and unshift", () => {
  const l = new Yallist([2, 3]);
  l.unshift(1);
  assert.equal(l.shift(), 1);
  assert.deepEqual(l.toArray(), [2, 3]);
});
