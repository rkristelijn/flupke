// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh http-errors <framework> | node scripts/generate-contracts.js --pkg http-errors
const { test } = require('node:test');
const assert = require('node:assert/strict');
const pkg = require('../src/index.js');

test("contract: http-errors() called as: http-errors(400, \"failed to parseInt '+nu\") (examples/params/index.js:26)", () => {
  // Verify http-errors is callable (framework calls it directly)
  assert.equal(typeof pkg, 'function', 'http-errors must be a function');
});

test("contract: http-errors() called as: http-errors(404, \"failed to find user\") (examples/params/index.js:39)", () => {
  // Verify http-errors is callable (framework calls it directly)
  assert.equal(typeof pkg, 'function', 'http-errors must be a function');
});
