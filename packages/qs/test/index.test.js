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

test("parse returns empty for null/undefined/false", () => {
  assert.deepEqual(qs.parse(null), {});
  assert.deepEqual(qs.parse(undefined), {});
  assert.deepEqual(qs.parse(""), {});
});

test("parse without ? prefix works", () => {
  assert.deepEqual(qs.parse("x=1"), { x: "1" });
});

test("stringify returns empty for falsy", () => {
  assert.strictEqual(qs.stringify(null), "");
  assert.strictEqual(qs.stringify(undefined), "");
  assert.strictEqual(qs.stringify(0), "");
});

test("stringify converts values to string", () => {
  assert.strictEqual(qs.stringify({ n: 42 }), "n=42");
  assert.strictEqual(qs.stringify({ b: true }), "b=true");
});

test("parse duplicate keys become array", () => {
  const r = qs.parse("x=1&x=2&x=3");
  assert.deepEqual(r, { x: ["1", "2", "3"] });
});

test("stringify skips undefined values", () => {
  assert.strictEqual(qs.stringify({ a: undefined }), "");
});
