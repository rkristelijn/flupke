// @ts-nocheck
// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh merge-descriptors <framework> | node scripts/generate-contracts.js --pkg merge-descriptors
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: merge-descriptors() called as: merge-descriptors(expr, expr, false) (express/lib/express.js:41)", () => {
  // Verify merge-descriptors is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "merge-descriptors must be a function");
});
