const { test } = require("node:test");
const assert = require("node:assert/strict");
const setFunctionLength = require("../src/index.js");

test("sets function length", () => {
  const fn = (a, b, c) => {};
  setFunctionLength(fn, 2);
  assert.equal(fn.length, 2);
});
