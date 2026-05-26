const { test } = require("node:test");
const assert = require("node:assert/strict");
const parse = require("../src/index.js").parse;

test("parses KEY=value", () => {
  assert.deepEqual(parse("FOO=bar\nBAZ=qux"), { FOO: "bar", BAZ: "qux" });
});
test("ignores comments and empty lines", () => {
  assert.deepEqual(parse("# comment\n\nFOO=bar"), { FOO: "bar" });
});
test("handles quoted values", () => {
  assert.deepEqual(parse('FOO="bar baz"'), { FOO: "bar baz" });
  assert.deepEqual(parse("FOO='bar baz'"), { FOO: "bar baz" });
});
test("handles escaped newlines", () => {
  assert.deepEqual(parse('FOO="line1\\nline2"'), { FOO: "line1\nline2" });
});
test("API compatible with dotenv", () => {
  const dotenv = require("../src/index.js");
  assert.equal(typeof dotenv.config, "function");
  assert.equal(typeof dotenv.parse, "function");
  assert.equal(typeof dotenv.populate, "function");
});
