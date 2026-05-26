const { it } = require("node:test");
const assert = require("node:assert/strict");
const base64id = require("../src/index.js");
it("generates base64 string", () => {
  const id = base64id.generateId();
  assert.strictEqual(typeof id, "string");
  assert.strictEqual(id.length, 16);
});
it("generates unique ids", () => {
  assert.notStrictEqual(base64id.generateId(), base64id.generateId());
});
