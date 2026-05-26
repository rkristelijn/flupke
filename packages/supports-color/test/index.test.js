const { test } = require("node:test");
const assert = require("node:assert/strict");
const supportsColor = require("../src/index.js");

test("returns object with color support flags", () => {
  const result = supportsColor();
  assert.ok("hasBasic" in result);
  assert.ok("has256" in result);
  assert.ok("has16m" in result);
});
