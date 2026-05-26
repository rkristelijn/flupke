// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh once <framework> | node scripts/generate-contracts.js --pkg once
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: once() called as: once(expr) (express/lib/application.js:602)", () => {
  // Verify once is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "once must be a function");
});
