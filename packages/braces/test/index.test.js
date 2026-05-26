const { test } = require("node:test");
const assert = require("node:assert/strict");
const braces = require("../src/index.js");

test("expand comma-separated", () => {
  assert.deepStrictEqual(braces("a{b,c}d", { expand: true }), ["abd", "acd"]);
});

test("expand numeric range", () => {
  assert.deepStrictEqual(braces("{1..3}", { expand: true }), ["1", "2", "3"]);
});

test("expand alpha range", () => {
  assert.deepStrictEqual(braces("{a..c}", { expand: true }), ["a", "b", "c"]);
});

test("expand with step", () => {
  assert.deepStrictEqual(braces("{1..9..2}", { expand: true }), [
    "1",
    "3",
    "5",
    "7",
    "9",
  ]);
});

test("expand descending", () => {
  assert.deepStrictEqual(braces("{3..1}", { expand: true }), ["3", "2", "1"]);
});

test("nested braces", () => {
  assert.deepStrictEqual(braces("a{b,{c,d}}e", { expand: true }), [
    "abe",
    "ace",
    "ade",
  ]);
});

test("compile mode (default)", () => {
  const result = braces("a{b,c}d");
  assert.strictEqual(result.length, 1);
  assert.ok(result[0].includes("b|c"));
});

test("no braces returns input", () => {
  assert.deepStrictEqual(braces("abc", { expand: true }), ["abc"]);
});

test("expand with prefix/suffix", () => {
  assert.deepStrictEqual(braces("x{a..c}y", { expand: true }), [
    "xay",
    "xby",
    "xcy",
  ]);
});

test("braces.expand function", () => {
  assert.deepStrictEqual(braces.expand("{a,b}"), ["a", "b"]);
});
