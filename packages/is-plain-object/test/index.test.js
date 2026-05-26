const { test } = require("node:test");
const assert = require("node:assert/strict");
const isPlain = require("../src/index.js");
test("plain objects", () => {
  assert.equal(isPlain({}), true);
  assert.equal(isPlain({ a: 1 }), true);
  assert.equal(isPlain(Object.create(null)), true);
});
test("not plain", () => {
  assert.equal(isPlain([]), false);
  assert.equal(isPlain(null), false);
  assert.equal(isPlain(new Date()), false);
  assert.equal(isPlain(/x/), false);
});
test("class instances", () => {
  class Foo {}
  assert.equal(isPlain(new Foo()), false);
});
