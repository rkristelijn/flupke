// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const supportsColor = require("../src/index.js");

test("has stdout property", () => {
  assert.ok("level" in supportsColor.stdout);
  assert.ok("hasBasic" in supportsColor.stdout);
  assert.ok("has256" in supportsColor.stdout);
  assert.ok("has16m" in supportsColor.stdout);
});

test("has stderr property", () => {
  assert.ok("level" in supportsColor.stderr);
  assert.ok("hasBasic" in supportsColor.stderr);
  assert.ok("has256" in supportsColor.stderr);
  assert.ok("has16m" in supportsColor.stderr);
});

test("top-level has color flags", () => {
  assert.ok("hasBasic" in supportsColor);
  assert.ok("has256" in supportsColor);
  assert.ok("has16m" in supportsColor);
  assert.ok("level" in supportsColor);
});

test("level is a number", () => {
  assert.strictEqual(typeof supportsColor.level, "number");
  assert.ok(supportsColor.level >= 0 && supportsColor.level <= 3);
});
