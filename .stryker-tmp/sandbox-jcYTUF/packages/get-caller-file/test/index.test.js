// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const getCaller = require("../src/index.js");
test("returns a string", () => {
  const f = getCaller(1);
  assert.equal(typeof f, "string");
});
test("returns filename", () => {
  assert.ok(getCaller(1).includes("index.test.js"));
});
test("undefined for invalid pos", () => {
  assert.equal(getCaller(999), undefined);
});
