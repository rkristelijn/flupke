// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh encodeurl <framework> | node scripts/generate-contracts.js --pkg encodeurl
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: encodeurl() called as: encodeurl(expr) (express/lib/response.js:795)", () => {
  // Verify encodeurl is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "encodeurl must be a function");
});
