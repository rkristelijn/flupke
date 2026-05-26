const { test } = require("node:test");
const assert = require("node:assert/strict");
const hasProto = require("../src/index.js");

test("is a function", () => {
  assert.equal(typeof hasProto, "function");
});

test("returns boolean", () => {
  assert.equal(typeof hasProto(), "boolean");
  assert.equal(hasProto(), true);
});
