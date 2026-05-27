// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pLocate = require("../src/index.js");
test("finds first match", async () => {
  const r = await pLocate([1, 2, 3], async (x) => x === 2);
  assert.equal(r, 2);
});
test("returns undefined if none", async () => {
  const r = await pLocate([1, 2], async (x) => x === 9);
  assert.equal(r, undefined);
});
test("stops at first", async () => {
  let c = 0;
  await pLocate([1, 2, 3], async (x) => {
    c++;
    return x === 1;
  });
  assert.equal(c, 1);
});
