// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const onExit = require("../src/index.js");

test("returns a function", () => {
  const remove = onExit(() => {});
  assert.equal(typeof remove, "function");
  remove();
});
