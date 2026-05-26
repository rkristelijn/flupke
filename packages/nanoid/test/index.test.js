const { test } = require("node:test");
const assert = require("node:assert/strict");
const nanoid = require("../src/index.js");
test("default length 21", () => {
  assert.equal(nanoid().length, 21);
});
test("custom length", () => {
  assert.equal(nanoid(10).length, 10);
});
test("unique", () => {
  assert.notEqual(nanoid(), nanoid());
});
test("url-safe chars", () => {
  assert.ok(/^[A-Za-z0-9_-]+$/.test(nanoid()));
});
