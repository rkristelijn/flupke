// @ts-nocheck
// Contract tests — auto-generated from framework usage analysis
// Source: extract-coupling.sh
// DO NOT EDIT — regenerate with: ./scripts/extract-coupling.sh debug <framework> | node scripts/generate-contracts.js --pkg debug
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pkg = require("../src/index.js");

test('contract: debug() called as: debug("booting in %s mode", expr) (express/lib/application.js:107)', () => {
  // Verify debug is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "debug must be a function");
});

test('contract: debug() called as: debug(".use app under %s", expr) (express/lib/application.js:225)', () => {
  // Verify debug is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "debug must be a function");
});

test('contract: debug() called as: debug("set \\"%s\\" to %o", expr, expr) (express/lib/application.js:357)', () => {
  // Verify debug is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "debug must be a function");
});

test('contract: debug() called as: debug("require \\"%s\\"", expr) (express/lib/view.js:78)', () => {
  // Verify debug is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "debug must be a function");
});

test('contract: debug() called as: debug("lookup \\"%s\\"", expr) (express/lib/view.js:108)', () => {
  // Verify debug is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "debug must be a function");
});

test('contract: debug() called as: debug("render \\"%s\\"", expr) (express/lib/view.js:136)', () => {
  // Verify debug is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "debug must be a function");
});

test('contract: debug() called as: debug("stat \\"%s\\"", expr) (express/lib/view.js:198)', () => {
  // Verify debug is callable (framework calls it directly)
  assert.equal(typeof pkg, "function", "debug must be a function");
});
