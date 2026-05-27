// @ts-nocheck
// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh depd <framework> | node scripts/generate-contracts.js --pkg depd
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test('contract: depd() called as: depd("Provide a url argument") (express/lib/response.js:824)', () => {
  // Verify depd is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "depd must be a function");
});

test('contract: depd() called as: depd("Url must be a string") (express/lib/response.js:828)', () => {
  // Verify depd is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "depd must be a function");
});

test('contract: depd() called as: depd("Status must be a number") (express/lib/response.js:832)', () => {
  // Verify depd is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "depd must be a function");
});
