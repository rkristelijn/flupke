const { test } = require("node:test");
const assert = require("node:assert/strict");
const { parseArgs } = require("../src/index.js");

test("parses env vars and command", () => {
  const result = parseArgs(["NODE_ENV=production", "node", "app.js"]);
  assert.deepStrictEqual(result.env, { NODE_ENV: "production" });
  assert.strictEqual(result.command, "node");
  assert.deepStrictEqual(result.args, ["app.js"]);
});

test("multiple env vars", () => {
  const result = parseArgs(["A=1", "B=2", "echo", "hi"]);
  assert.deepStrictEqual(result.env, { A: "1", B: "2" });
  assert.strictEqual(result.command, "echo");
});

test("strips quotes from values", () => {
  const result = parseArgs(['FOO="bar"', "echo"]);
  assert.strictEqual(result.env.FOO, "bar");
});

test("empty args", () => {
  const result = parseArgs([]);
  assert.deepStrictEqual(result.env, {});
  assert.strictEqual(result.command, undefined);
});

test("no env vars", () => {
  const result = parseArgs(["node", "script.js"]);
  assert.deepStrictEqual(result.env, {});
  assert.strictEqual(result.command, "node");
  assert.deepStrictEqual(result.args, ["script.js"]);
});
