// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const memoizeOne = require("../src/index.js");
test("caches last call", () => {
  let c = 0;
  const fn = memoizeOne((a, b) => {
    c++;
    return a + b;
  });
  fn(1, 2);
  fn(1, 2);
  assert.equal(c, 1);
});
test("recomputes on change", () => {
  let c = 0;
  const fn = memoizeOne((x) => {
    c++;
    return x;
  });
  fn(1);
  fn(2);
  assert.equal(c, 2);
});
test("only remembers last", () => {
  let c = 0;
  const fn = memoizeOne((x) => {
    c++;
    return x;
  });
  fn(1);
  fn(2);
  fn(1);
  assert.equal(c, 3);
});
