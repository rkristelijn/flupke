const { test } = require("node:test");
const assert = require("node:assert/strict");
const assign = require("../src/index.js");

test("is Object.assign", () => {
  assert.strictEqual(assign, Object.assign);
});

test("merges objects", () => {
  const result = assign({}, { a: 1 }, { b: 2 });
  assert.deepStrictEqual(result, { a: 1, b: 2 });
});

test("overwrites properties", () => {
  assert.deepStrictEqual(assign({ a: 1 }, { a: 2 }), { a: 2 });
});

test("mutates target", () => {
  const target = { a: 1 };
  assign(target, { b: 2 });
  assert.deepStrictEqual(target, { a: 1, b: 2 });
});

test("skips non-enumerable", () => {
  const src = Object.defineProperty({}, "x", { value: 1, enumerable: false });
  assert.deepStrictEqual(assign({}, src), {});
});
