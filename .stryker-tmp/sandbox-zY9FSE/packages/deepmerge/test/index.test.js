// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const deepmerge = require("../src/index.js");

test("merges flat objects", () => {
  assert.deepEqual(deepmerge({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
});
test("merges nested objects", () => {
  assert.deepEqual(deepmerge({ a: { b: 1 } }, { a: { c: 2 } }), {
    a: { b: 1, c: 2 },
  });
});
test("overwrites primitives", () => {
  assert.deepEqual(deepmerge({ a: 1 }, { a: 2 }), { a: 2 });
});
test("merges arrays by concat", () => {
  assert.deepEqual(deepmerge({ a: [1] }, { a: [2] }), { a: [1, 2] });
});
test("deepmerge.all", () => {
  assert.deepEqual(deepmerge.all([{ a: 1 }, { b: 2 }, { c: 3 }]), {
    a: 1,
    b: 2,
    c: 3,
  });
});
test("does not mutate source", () => {
  const a = { x: 1 };
  deepmerge(a, { y: 2 });
  assert.equal(a.y, undefined);
});

test("returns target when source is falsy", () => {
  const t = { a: 1 };
  assert.deepEqual(deepmerge(t, null), t);
  assert.deepEqual(deepmerge(t, undefined), t);
});

test("source array without target array returns copy", () => {
  const result = deepmerge({ a: 1 }, [1, 2, 3]);
  assert.deepEqual(result, [1, 2, 3]);
  assert.ok(Array.isArray(result));
});

test("source array with target array concats", () => {
  const result = deepmerge([1, 2], [3, 4]);
  assert.deepEqual(result, [1, 2, 3, 4]);
});

test("arrayMerge option is called", () => {
  let called = false;
  deepmerge([1], [2], { arrayMerge: (t, s) => { called = true; return [...t, ...s]; } });
  assert.strictEqual(called, true);
});

test("arrayMerge on nested arrays", () => {
  const result = deepmerge({ a: [1] }, { a: [2] }, { arrayMerge: (t, s) => s });
  assert.deepEqual(result, { a: [2] });
});

test("non-object source value overwrites object target", () => {
  assert.deepEqual(deepmerge({ a: { b: 1 } }, { a: 42 }), { a: 42 });
});

test("null source value overwrites", () => {
  assert.deepEqual(deepmerge({ a: { b: 1 } }, { a: null }), { a: null });
});

test("deeply nested merge", () => {
  const result = deepmerge({ a: { b: { c: 1 } } }, { a: { b: { d: 2 } } });
  assert.deepEqual(result, { a: { b: { c: 1, d: 2 } } });
});

test("array target with non-array source", () => {
  assert.deepEqual(deepmerge({ a: [1, 2] }, { a: "str" }), { a: "str" });
});
