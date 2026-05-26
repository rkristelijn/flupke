const { test } = require("node:test");
const assert = require("node:assert/strict");
const sw = require("../src/index.js");
test("ascii", () => {
  assert.equal(sw("hello"), 5);
});
test("fullwidth", () => {
  assert.equal(sw("中文"), 4);
});
test("strips ansi", () => {
  assert.equal(sw("\x1b[31mred\x1b[0m"), 3);
});
