import assert from "node:assert/strict";
import { test } from "node:test";
import _, { chunk, get, isPlainObject, camelCase } from "../src/index.js";

test("default export has all methods", () => {
  assert.strictEqual(typeof _.chunk, "function");
  assert.strictEqual(typeof _.get, "function");
  assert.strictEqual(typeof _.merge, "function");
});

test("named export chunk", () => {
  assert.deepStrictEqual(chunk([1, 2, 3, 4], 2), [
    [1, 2],
    [3, 4],
  ]);
});

test("named export get", () => {
  assert.strictEqual(get({ a: { b: 1 } }, "a.b"), 1);
});

test("named export isPlainObject", () => {
  assert.strictEqual(isPlainObject({}), true);
  assert.strictEqual(isPlainObject(null), false);
});

test("named export camelCase", () => {
  assert.strictEqual(camelCase("foo-bar"), "fooBar");
});
