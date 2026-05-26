const { test } = require("node:test");
const assert = require("node:assert/strict");
const debug = require("../src/index.js");
test("returns function", () => {
  assert.equal(typeof debug("test"), "function");
});
test("has namespace", () => {
  assert.equal(debug("myapp").namespace, "myapp");
});
test("enabled checks DEBUG env", () => {
  process.env.DEBUG = "foo";
  assert.equal(debug.enabled("foo"), true);
  assert.equal(debug.enabled("bar"), false);
  process.env.DEBUG = undefined;
});
