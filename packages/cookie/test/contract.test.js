// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh cookie <framework> | node scripts/generate-contracts.js --pkg cookie
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: cookie.serialize() exists (express/lib/response.js:772)", () => {
  assert.equal(
    typeof pkg.serialize,
    "function",
    "cookie.serialize must be a function",
  );
});
