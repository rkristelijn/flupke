// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const clsx = require("../src/index.js");

test("strings", () => {
  assert.equal(clsx("a", "b"), "a b");
});
test("objects", () => {
  assert.equal(clsx({ a: true, b: false, c: true }), "a c");
});
test("mixed", () => {
  assert.equal(clsx("a", { b: true }, "c"), "a b c");
});
test("arrays", () => {
  assert.equal(clsx(["a", "b"]), "a b");
});
test("falsy values ignored", () => {
  assert.equal(clsx(null, undefined, false, 0, "", "a"), "a");
});
test("nested arrays", () => {
  assert.equal(clsx("a", ["b", ["c"]]), "a b c");
});
test("empty returns empty", () => {
  assert.equal(clsx(), "");
});
