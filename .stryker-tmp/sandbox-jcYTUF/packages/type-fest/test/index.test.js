// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const typeFest = require("../src/index.js");
test("exports object", () => {
  assert.equal(typeof typeFest, "object");
});
test("types-only package", () => {
  assert.deepEqual(typeFest, {});
});
test("d.ts exists", () => {
  require("node:fs").accessSync(
    require("node:path").join(__dirname, "../src/index.d.ts"),
  );
});
