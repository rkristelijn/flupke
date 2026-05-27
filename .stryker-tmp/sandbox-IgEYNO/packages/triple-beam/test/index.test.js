// @ts-nocheck
const { it } = require("node:test");
const assert = require("node:assert/strict");
const { LEVEL, MESSAGE, SPLAT } = require("../src/index.js");
it("exports symbols", () => {
  assert.strictEqual(typeof LEVEL, "symbol");
  assert.strictEqual(typeof MESSAGE, "symbol");
  assert.strictEqual(typeof SPLAT, "symbol");
});
it("uses Symbol.for", () => {
  assert.strictEqual(LEVEL, Symbol.for("level"));
});

it("exports configs with npm/syslog/cli", () => {
  const { configs } = require("../src/index.js");
  assert.ok(configs.npm.levels);
  assert.ok(configs.syslog.levels);
  assert.ok(configs.cli.levels);
  assert.strictEqual(configs.npm.levels.error, 0);
  assert.strictEqual(configs.syslog.levels.emerg, 0);
});
