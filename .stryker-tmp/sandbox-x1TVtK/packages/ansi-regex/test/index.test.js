// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const ansiRegex = require("../src/index.js");

test("returns a regex", () => {
  const regex = ansiRegex();
  assert.ok(regex instanceof RegExp);
});

test("matches ANSI codes", () => {
  const regex = ansiRegex();
  const str = "\x1b[31mred\x1b[0m";
  const match = str.match(regex);
  assert.ok(match);
  assert.strictEqual(match.length, 2);
});
