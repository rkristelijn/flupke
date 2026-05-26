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
