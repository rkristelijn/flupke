// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const pRetry = require("../src/index.js");

test("resolves on success", async () => {
  const result = await pRetry(() => "ok");
  assert.strictEqual(result, "ok");
});

test("retries on failure", async () => {
  let calls = 0;
  const result = await pRetry(
    () => {
      calls++;
      if (calls < 3) throw new Error("fail");
      return "done";
    },
    { retries: 5 },
  );
  assert.strictEqual(result, "done");
  assert.strictEqual(calls, 3);
});

test("throws after retries exhausted", async () => {
  await assert.rejects(
    pRetry(
      () => {
        throw new Error("always");
      },
      { retries: 2 },
    ),
    { message: "always" },
  );
});

test("AbortError stops retrying", async () => {
  let calls = 0;
  await assert.rejects(
    pRetry(
      () => {
        calls++;
        throw new pRetry.AbortError("stop");
      },
      { retries: 5 },
    ),
    { message: "stop" },
  );
  assert.strictEqual(calls, 1);
});

test("onFailedAttempt called", async () => {
  const attempts = [];
  await pRetry(
    () => {
      if (attempts.length < 2) throw new Error("fail");
      return "ok";
    },
    { retries: 3, onFailedAttempt: (e) => attempts.push(e.attemptNumber) },
  );
  assert.deepStrictEqual(attempts, [1, 2]);
});

test("passes attempt number to fn", async () => {
  const seen = [];
  await pRetry(
    (attempt) => {
      seen.push(attempt);
      if (attempt < 2) throw new Error("retry");
      return "ok";
    },
    { retries: 3 },
  );
  assert.deepStrictEqual(seen, [0, 1, 2]);
});

test("AbortError wraps original error", async () => {
  const orig = new Error("original");
  await assert.rejects(
    pRetry(
      () => {
        throw new pRetry.AbortError(orig);
      },
      { retries: 5 },
    ),
    { message: "original" },
  );
});
