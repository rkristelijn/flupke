const { test } = require("node:test");
const assert = require("node:assert/strict");
const emojiRegex = require("../src/index.js");
test("matches emoji", () => {
  assert.deepEqual("Hello 🌍!".match(emojiRegex()), ["🌍"]);
});
test("no match on text", () => {
  assert.equal("hello".match(emojiRegex()), null);
});
test("multiple emoji", () => {
  assert.equal("🎉🚀✨".match(emojiRegex()).length, 3);
});
