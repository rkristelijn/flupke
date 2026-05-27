// @ts-nocheck
// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh content-disposition <framework> | node scripts/generate-contracts.js --pkg content-disposition
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: content-disposition() called as: content-disposition(expr) (express/lib/response.js:457)", () => {
  // Verify content-disposition is callable (framework calls it directly)
  assert.equal(
    typeof pkg,
    "function",
    "content-disposition must be a function",
  );
});
