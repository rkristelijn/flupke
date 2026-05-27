// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const hasSymbols = require("../src/index.js");

test("returns true when Symbol.iterator exists", () => {
  assert.equal(typeof hasSymbols, "function");
  assert.equal(hasSymbols(), typeof Symbol.iterator === "symbol");
});
