const { test } = require("node:test");
const assert = require("node:assert/strict");
const type = require("../src/index.js");
test("primitives", () => {
  assert.equal(type(null), "null");
  assert.equal(type(undefined), "undefined");
  assert.equal(type(1), "Number");
  assert.equal(type(""), "String");
});
test("objects", () => {
  assert.equal(type({}), "Object");
  assert.equal(type([]), "Array");
  assert.equal(type(/x/), "RegExp");
  assert.equal(type(new Date()), "Date");
});
test("functions", () => {
  assert.equal(
    type(() => {}),
    "Function",
  );
});
