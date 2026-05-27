// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const mem = require("../src/index.js");
test("caches", () => {
  let c = 0;
  const fn = mem((x) => {
    c++;
    return x * 2;
  });
  fn(5);
  fn(5);
  assert.equal(c, 1);
});
test("different args", () => {
  let c = 0;
  const fn = mem((x) => {
    c++;
    return x;
  });
  fn(1);
  fn(2);
  assert.equal(c, 2);
});
test("returns correct value", () => {
  const fn = mem((x) => x + 1);
  assert.equal(fn(1), 2);
});
