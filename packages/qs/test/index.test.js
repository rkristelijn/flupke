const { test } = require("node:test");
const assert = require("node:assert/strict");
const qs = require("../src/index.js");

test("parse simple", () => {
  assert.deepEqual(qs.parse("a=1&b=2"), { a: "1", b: "2" });
});
test("strips leading ? not #", () => {
  assert.deepEqual(qs.parse("?a=1"), { a: "1" });
  assert.deepEqual(qs.parse("#a=1"), { "#a": "1" });
});
test("parse with ?", () => {
  assert.deepEqual(qs.parse("?foo=bar"), { foo: "bar" });
});
test("parse arrays", () => {
  const r = qs.parse("a=1&a=2");
  assert.deepEqual(r, { a: ["1", "2"] });
});
test("parse empty", () => {
  assert.deepEqual(qs.parse(""), {});
});
test("stringify simple", () => {
  assert.equal(qs.stringify({ a: "1", b: "2" }), "a=1&b=2");
});
test("stringify arrays", () => {
  assert.equal(qs.stringify({ a: ["1", "2"] }), "a=1&a=2");
});
test("stringify skips null/undefined", () => {
  assert.equal(qs.stringify({ a: null, b: "1" }), "b=1");
});
