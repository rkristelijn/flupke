const { test } = require("node:test");
const assert = require("node:assert/strict");
const FlupkeAggregateError = require("../src/index.js");
test("stores errors", () => {
  const e = new FlupkeAggregateError([new Error("a"), new Error("b")]);
  assert.equal(e.errors.length, 2);
});
test("has message", () => {
  const e = new FlupkeAggregateError([], "oops");
  assert.equal(e.message, "oops");
});
test("is Error", () => {
  assert.ok(new FlupkeAggregateError([]) instanceof Error);
});
