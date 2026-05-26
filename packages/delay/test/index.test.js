const { test } = require("node:test");
const assert = require("node:assert/strict");
const delay = require("../src/index.js");
test("resolves after ms", async () => {
  const t = Date.now();
  await delay(20);
  assert.ok(Date.now() - t >= 15);
});
test("reject", async () => {
  await assert.rejects(delay.reject(1));
});
test("returns promise", () => {
  assert.ok(delay(1) instanceof Promise);
});
