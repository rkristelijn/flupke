const { test } = require("node:test");
const assert = require("node:assert/strict");
const retry = require("../src/index.js");
test("succeeds first try", async () => {
  const r = await retry(async () => 42);
  assert.equal(r, 42);
});
test("retries on failure", async () => {
  let c = 0;
  const r = await retry(
    async () => {
      if (++c < 3) throw new Error("no");
      return "ok";
    },
    { retries: 3, delay: 1 },
  );
  assert.equal(r, "ok");
  assert.equal(c, 3);
});
test("throws after max retries", async () => {
  await assert.rejects(
    retry(
      async () => {
        throw new Error("fail");
      },
      { retries: 2, delay: 1 },
    ),
  );
});
