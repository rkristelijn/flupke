// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const convert = require("../src/index.js");

test("rgb to hsl", () => {
  assert.deepStrictEqual(convert.rgb.hsl(255, 0, 0), [0, 100, 50]);
});

test("rgb to hex", () => {
  assert.strictEqual(convert.rgb.hex(255, 0, 0), "#ff0000");
});

test("hsl to rgb", () => {
  assert.deepStrictEqual(convert.hsl.rgb(0, 100, 50), [255, 0, 0]);
});

test("hex to rgb", () => {
  assert.deepStrictEqual(convert.hex.rgb("#ff0000"), [255, 0, 0]);
});
