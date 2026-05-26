const { test } = require("node:test");
const assert = require("node:assert/strict");
const wrap = require("../src/index.js");
test("wraps long lines", () => {
  assert.equal(wrap("hello world", 5), "hello\n worl\nd");
});
test("preserves short lines", () => {
  assert.equal(wrap("hi", 10), "hi");
});
test("handles ansi", () => {
  const r = wrap("\x1b[31mhello world\x1b[0m", 5);
  assert.ok(r.includes("\x1b[31m"));
});
