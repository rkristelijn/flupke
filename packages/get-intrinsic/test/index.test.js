const { test } = require("node:test");
const assert = require("node:assert/strict");
const getIntrinsic = require("../src/index.js");

test("returns intrinsics", () => {
  assert.strictEqual(getIntrinsic("%Array%"), Array);
  assert.strictEqual(getIntrinsic("%Object%"), Object);
  assert.strictEqual(getIntrinsic("%Number%"), Number);
});

test("throws for unknown intrinsic", () => {
  assert.throws(() => getIntrinsic("%Unknown%"), TypeError);
});
