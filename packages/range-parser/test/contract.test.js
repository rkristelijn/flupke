// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh range-parser <framework> | node scripts/generate-contracts.js --pkg range-parser
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: range-parser() called as: range-parser(expr, expr, expr) (express/lib/request.js:217)", () => {
  // Verify range-parser is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "range-parser must be a function");
});
