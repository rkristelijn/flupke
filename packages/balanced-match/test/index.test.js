const { test } = require("node:test");
const assert = require("node:assert/strict");
const balanced = require("../src/index.js");

test("finds matching braces", () => {
  const result = balanced("{", "}", "{hello}");
  assert.deepStrictEqual(result, {
    start: 0,
    end: 7,
    pre: "",
    body: "hello",
    post: "",
  });
});

test("returns -1 for no match", () => {
  assert.strictEqual(balanced("{", "}", "{hello"), -1);
});
