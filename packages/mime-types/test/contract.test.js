// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh mime-types <framework> | node scripts/generate-contracts.js --pkg mime-types
const { test } = require('node:test');
const assert = require('node:assert/strict');
const pkg = require('../src/index.js');

test("contract: mime-types.lookup() exists (express/lib/utils.js:64)", () => {
  assert.equal(typeof pkg.lookup, 'function', 'mime-types.lookup must be a function');
});

test("contract: mime-types.contentType() exists (express/lib/response.js:485)", () => {
  assert.equal(typeof pkg.contentType, 'function', 'mime-types.contentType must be a function');
});

test("contract: mime-types.contentType() exists (express/lib/response.js:506)", () => {
  assert.equal(typeof pkg.contentType, 'function', 'mime-types.contentType must be a function');
});
