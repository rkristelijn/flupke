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

test("numeric range with padding", () => {
  assert.deepStrictEqual(braces("{01..03}", { expand: true }), ["01", "02", "03"]);
});

test("negative numeric range", () => {
  assert.deepStrictEqual(braces("{-2..2}", { expand: true }), ["-2", "-1", "0", "1", "2"]);
});

test("char range descending", () => {
  assert.deepStrictEqual(braces("{z..w}", { expand: true }), ["z", "y", "x", "w"]);
});

test("range with step", () => {
  assert.deepStrictEqual(braces("{0..10..3}", { expand: true }), ["0", "3", "6", "9"]);
});

test("compile mode produces regex-like output", () => {
  const result = braces("file.{js,ts}");
  assert.ok(result[0].includes("js|ts"));
});

test("compile mode handles ranges", () => {
  const result = braces("{1..3}");
  assert.ok(result[0].includes("1|3"));
});

test("deeply nested comma expansion", () => {
  const result = braces("{a,{b,c}}", { expand: true });
  assert.deepStrictEqual(result.sort(), ["a", "b", "c"]);
});

test("empty braces no expansion", () => {
  assert.deepStrictEqual(braces("{}", { expand: true }), ["{}"]);
});

test("single item in braces", () => {
  assert.deepStrictEqual(braces("{a}", { expand: true }), ["{a}"]);
});

test("multiple brace sets", () => {
  const result = braces("{a,b}{1,2}", { expand: true });
  assert.deepStrictEqual(result.sort(), ["a1", "a2", "b1", "b2"]);
});
