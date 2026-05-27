// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const hr = require("../src/index.js");
test("bytes", () => {
  assert.equal(hr(0), "0 B");
  assert.equal(hr(500), "500 B");
});
test("kilobytes", () => {
  assert.equal(hr(1024), "1.0 KB");
});
test("megabytes", () => {
  assert.equal(hr(1048576), "1.0 MB");
});
test("gigabytes", () => {
  assert.equal(hr(1073741824), "1.0 GB");
});
