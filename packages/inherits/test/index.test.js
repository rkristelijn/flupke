const { test } = require("node:test");
const assert = require("node:assert/strict");
const inherits = require("../src/index.js");

test("sets up prototype chain", () => {
  function Parent() {}
  Parent.prototype.hello = () => "world";
  function Child() {}
  inherits(Child, Parent);
  const c = new Child();
  assert.equal(c.hello(), "world");
  assert.ok(c instanceof Child);
  assert.ok(c instanceof Parent);
});

test("sets super_ property", () => {
  function A() {}
  function B() {}
  inherits(B, A);
  assert.equal(B.super_, A);
});

test("constructor is correct", () => {
  function A() {}
  function B() {}
  inherits(B, A);
  assert.equal(new B().constructor, B);
});

test("throws on invalid superCtor", () => {
  function A() {}
  assert.throws(() => inherits(A, null), TypeError);
  assert.throws(() => inherits(A, undefined), TypeError);
  assert.throws(() => inherits(A, 42), TypeError);
});

test("throws on invalid ctor", () => {
  function A() {}
  assert.throws(() => inherits("not a function", A), TypeError);
});
