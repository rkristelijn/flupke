// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh statuses <framework> | node scripts/generate-contracts.js --pkg statuses
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: statuses.message exists (express/lib/response.js:322)", () => {
  assert.ok(
    "message" in pkg || typeof pkg.message !== "undefined",
    "statuses.message must exist",
  );
});
