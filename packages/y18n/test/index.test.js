const { test } = require("node:test");
const assert = require("node:assert/strict");
const y18n = require("../src/index.js");
test("returns string as-is", () => {
  const i = y18n();
  assert.equal(i.__("hello"), "hello");
});
test("interpolates", () => {
  const i = y18n();
  assert.equal(i.__("hi %s", "world"), "hi world");
});
test("uses locale", () => {
  const i = y18n();
  i.updateLocale({ hello: "hoi" });
  assert.equal(i.__("hello"), "hoi");
});
