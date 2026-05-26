const { test } = require("node:test");
const assert = require("node:assert/strict");
const concatMap = require("../src/index.js");
test("flattens mapped arrays", () => {
  assert.deepEqual(
    concatMap([1, 2, 3], (x) => [x, x * 2]),
    [1, 2, 2, 4, 3, 6],
  );
});
test("handles non-array returns", () => {
  assert.deepEqual(
    concatMap([1, 2, 3], (x) => x + 1),
    [2, 3, 4],
  );
});
test("empty array", () => {
  assert.deepEqual(
    concatMap([], (x) => x),
    [],
  );
});
