// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh vary <framework> | node scripts/generate-contracts.js --pkg vary
const { test } = require('node:test');
const assert = require('node:assert/strict');
const pkg = require('../src/index.js');

test("contract: vary() called as: vary(expr, expr) (express/lib/response.js:876)", () => {
  // Verify vary is callable (framework calls it directly)
  assert.equal(typeof pkg, 'function', 'vary must be a function');
});
