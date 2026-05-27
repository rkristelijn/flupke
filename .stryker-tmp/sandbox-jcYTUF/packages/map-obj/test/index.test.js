// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const mapObj = require("../src/index.js");
test("maps keys and values", () => {
  assert.deepEqual(
    mapObj({ a: 1 }, (k, v) => [k.toUpperCase(), v * 2]),
    { A: 2 },
  );
});
test("empty object", () => {
  assert.deepEqual(
    mapObj({}, (k, v) => [k, v]),
    {},
  );
});
test("preserves count", () => {
  assert.equal(Object.keys(mapObj({ a: 1, b: 2 }, (k, v) => [k, v])).length, 2);
});
