// @ts-nocheck
// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh escape-html <framework> | node scripts/generate-contracts.js --pkg escape-html
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: escape-html() called as: escape-html(expr) (express/lib/response.js:845)", () => {
  // Verify escape-html is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "escape-html must be a function");
});
