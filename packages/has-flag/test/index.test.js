const { test } = require("node:test");
const assert = require("node:assert/strict");
const hasFlag = require("../src/index.js");

test("is a function", () => {
  assert.equal(typeof hasFlag, "function");
});

test("returns boolean", () => {
  assert.equal(typeof hasFlag("test"), "boolean");
});
