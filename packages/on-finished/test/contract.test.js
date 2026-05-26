// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh on-finished <framework> | node scripts/generate-contracts.js --pkg on-finished
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: on-finished() called as: on-finished(expr, expr) (express/lib/response.js:992)", () => {
  // Verify on-finished is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "on-finished must be a function");
});
