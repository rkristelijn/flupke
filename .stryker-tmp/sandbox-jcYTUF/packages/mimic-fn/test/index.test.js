// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const mimic = require("../src/index.js");
test("copies name", () => {
  function foo() {}
  const bar = mimic(() => {}, foo);
  assert.equal(bar.name, "foo");
});
test("copies length", () => {
  function foo(a, b, c) {}
  const bar = mimic(() => {}, foo);
  assert.equal(bar.length, 3);
});
test("returns target", () => {
  const fn = () => {};
  assert.equal(
    mimic(fn, function x() {}),
    fn,
  );
});
