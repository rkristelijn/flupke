// @ts-nocheck
// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh parseurl <framework> | node scripts/generate-contracts.js --pkg parseurl
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: parseurl() called as: parseurl(expr) (express/lib/request.js:238)", () => {
  // Verify parseurl is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "parseurl must be a function");
});
