// @ts-nocheck
// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh content-type <framework> | node scripts/generate-contracts.js --pkg content-type
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test("contract: content-type.parse() exists (express/lib/utils.js:231)", () => {
  assert.equal(
    typeof pkg.parse,
    "function",
    "content-type.parse must be a function",
  );
});

test("contract: content-type.format() exists (express/lib/utils.js:237)", () => {
  assert.equal(
    typeof pkg.format,
    "function",
    "content-type.format must be a function",
  );
});
