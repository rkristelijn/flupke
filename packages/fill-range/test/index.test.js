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
