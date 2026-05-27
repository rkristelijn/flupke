// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const resolveFrom = require("../src/index.js");
test("resolves module", () => {
  const r = resolveFrom(__dirname, "node:path");
  assert.equal(typeof r, "string");
});
test("throws on missing", () => {
  assert.throws(() => resolveFrom(__dirname, "nonexistent-xyz-pkg"));
});
test("silent returns undefined", () => {
  assert.equal(resolveFrom.silent(__dirname, "nonexistent-xyz-pkg"), undefined);
});
