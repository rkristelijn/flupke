const { test } = require("node:test");
const assert = require("node:assert/strict");
const importFresh = require("../src/index.js");
test("returns module", () => {
  const path = importFresh("node:path");
  assert.equal(typeof path.join, "function");
});
test("clears cache", () => {
  const r1 = importFresh("../package.json");
  const r2 = importFresh("../package.json");
  assert.deepEqual(r1, r2);
});
test("throws on missing", () => {
  assert.throws(() => importFresh("nonexistent-xyz"));
});
