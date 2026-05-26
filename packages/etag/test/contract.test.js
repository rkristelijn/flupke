// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh etag <framework> | node scripts/generate-contracts.js --pkg etag
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: etag() called as: etag(expr, expr) (express/lib/utils.js:255)", () => {
  // Verify etag is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "etag must be a function");
});
