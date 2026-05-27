// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const defineDataProperty = require("../src/index.js");

test("is a function", () => {
  assert.equal(typeof defineDataProperty, "function");
});

test("defines property", () => {
  const obj = {};
  defineDataProperty(obj, "x", { value: 1 });
  assert.equal(obj.x, 1);
});
