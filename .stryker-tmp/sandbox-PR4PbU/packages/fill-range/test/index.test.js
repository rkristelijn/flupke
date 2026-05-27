// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fill = require("../src/index.js");

test("numeric ascending", () => {
  assert.deepStrictEqual(fill(1, 5), ["1", "2", "3", "4", "5"]);
});

test("numeric descending", () => {
  assert.deepStrictEqual(fill(5, 1), ["5", "4", "3", "2", "1"]);
});

test("numeric with step", () => {
  assert.deepStrictEqual(fill(0, 10, 2), ["0", "2", "4", "6", "8", "10"]);
});

test("alpha ascending", () => {
  assert.deepStrictEqual(fill("a", "e"), ["a", "b", "c", "d", "e"]);
});

test("alpha descending", () => {
  assert.deepStrictEqual(fill("e", "a"), ["e", "d", "c", "b", "a"]);
});

test("alpha with step", () => {
  assert.deepStrictEqual(fill("a", "f", 2), ["a", "c", "e"]);
});

test("zero-padded", () => {
  assert.deepStrictEqual(fill("01", "03"), ["01", "02", "03"]);
});

test("negative numbers", () => {
  assert.deepStrictEqual(fill(-2, 2), ["-2", "-1", "0", "1", "2"]);
});

test("transform option", () => {
  const result = fill(1, 3, { transform: (v) => `item${v}` });
  assert.deepStrictEqual(result, ["item1", "item2", "item3"]);
});

test("string numbers", () => {
  assert.deepStrictEqual(fill("1", "3"), ["1", "2", "3"]);
});

test("throws on invalid", () => {
  assert.throws(() => fill("foo", "bar"), TypeError);
});

test("step as object (options)", () => {
  const result = fill(1, 5, { transform: (v) => `#${v}` });
  assert.deepStrictEqual(result, ["#1", "#2", "#3", "#4", "#5"]);
});

test("single char range with step", () => {
  assert.deepStrictEqual(fill("a", "z", 5), ["a", "f", "k", "p", "u", "z"]);
});

test("descending char range", () => {
  assert.deepStrictEqual(fill("d", "a"), ["d", "c", "b", "a"]);
});

test("negative descending", () => {
  assert.deepStrictEqual(fill(2, -2), ["2", "1", "0", "-1", "-2"]);
});

test("pad option", () => {
  assert.deepStrictEqual(fill(1, 100, 49, { pad: true }), ["001", "050", "099"]);
});

test("single number returns single element", () => {
  assert.deepStrictEqual(fill(5, 5), ["5"]);
});

test("single char returns single element", () => {
  assert.deepStrictEqual(fill("a", "a"), ["a"]);
});

test("multi-char string treated as number", () => {
  assert.deepStrictEqual(fill("10", "13"), ["10", "11", "12", "13"]);
});

test("throws for non-numeric multi-char strings", () => {
  assert.throws(() => fill("foo", "bar"), TypeError);
});

test("NaN check triggers on invalid", () => {
  assert.throws(() => fill("x", "1"), TypeError);
  assert.throws(() => fill("1", "x"), TypeError);
});

test("zero-padded detection from string format", () => {
  assert.deepStrictEqual(fill("001", "003"), ["001", "002", "003"]);
  assert.deepStrictEqual(fill(1, 3), ["1", "2", "3"]);
});

test("ascending vs descending numbers", () => {
  assert.deepStrictEqual(fill(1, 3), ["1", "2", "3"]);
  assert.deepStrictEqual(fill(3, 1), ["3", "2", "1"]);
});

test("ascending vs descending chars", () => {
  assert.deepStrictEqual(fill("a", "c"), ["a", "b", "c"]);
  assert.deepStrictEqual(fill("c", "a"), ["c", "b", "a"]);
});

test("negative padding", () => {
  const result = fill("-01", "01");
  assert.ok(result.includes("-01"));
  assert.ok(result.includes("00"));
  assert.ok(result.includes("01"));
});

test("error message is correct", () => {
  assert.throws(() => fill("abc", "def"), { message: /fill-range/ });
});
