const { test } = require("node:test");
const assert = require("node:assert/strict");
const gopd = require("../src/index.js");

test("is Object.getOwnPropertyDescriptor", () => {
  assert.equal(gopd, Object.getOwnPropertyDescriptor);
});

test("returns property descriptor", () => {
  const desc = gopd({ x: 1 }, "x");
  assert.deepStrictEqual(desc, {
    value: 1,
    enumerable: true,
    writable: true,
    configurable: true,
  });
});
