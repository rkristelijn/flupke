const { test } = require("node:test");
const assert = require("node:assert/strict");
const decamelize = require("../src/index.js");
test("default", () => {
  assert.equal(decamelize("fooBar"), "foo_bar");
});
test("custom sep", () => {
  assert.equal(decamelize("fooBar", "-"), "foo-bar");
});
test("already lower", () => {
  assert.equal(decamelize("foo"), "foo");
});
