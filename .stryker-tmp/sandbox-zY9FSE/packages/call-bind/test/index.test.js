// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const callBind = require("../src/index.js");

test("is a function", () => {
  assert.equal(typeof callBind, "function");
});

test("binds call", () => {
  const obj = { value: 42 };
  function getValue() {
    return this.value;
  }
  const bound = callBind.call(getValue, obj);
  assert.equal(bound(), 42);
});
