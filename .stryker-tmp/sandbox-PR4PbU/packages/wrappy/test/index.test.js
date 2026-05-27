// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const wrappy = require("../src/index.js");
test("copies properties", () => {
  function a() {}
  a.x = 1;
  const b = wrappy(a, () => {});
  assert.equal(b.x, 1);
});
test("copies prototype", () => {
  function a() {}
  a.prototype.hi = () => "y";
  const b = wrappy(a, function () {});
  assert.equal(new b().hi(), "y");
});
test("returns cb", () => {
  function a() {}
  const b = () => {};
  assert.equal(wrappy(a, b), b);
});
