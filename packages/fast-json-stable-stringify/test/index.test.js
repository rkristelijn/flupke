const { test } = require("node:test");
const assert = require("node:assert/strict");
const stringify = require("../src/index.js");
const origStringify = require("fast-json-stable-stringify");

test("sorts keys", () => {
  assert.equal(stringify({ b: 2, a: 1 }), '{"a":1,"b":2}');
});
test("handles nested objects", () => {
  assert.equal(
    stringify({ b: { d: 4, c: 3 }, a: 1 }),
    '{"a":1,"b":{"c":3,"d":4}}',
  );
});
test("handles arrays", () => {
  assert.equal(stringify([3, 1, 2]), "[3,1,2]");
});
test("handles null/undefined", () => {
  assert.equal(stringify(null), "null");
  assert.equal(stringify({ a: undefined, b: 1 }), '{"b":1}');
});
test("handles strings with special chars", () => {
  assert.equal(stringify({ a: 'hello "world"' }), '{"a":"hello \\"world\\""}');
});
test("matches original for complex objects", () => {
  const obj = { z: [1, { b: 2, a: 1 }], a: "hello", m: null, c: true };
  assert.equal(stringify(obj), origStringify(obj));
});
test("throws on circular reference", () => {
  const obj = {};
  obj.self = obj;
  assert.throws(() => stringify(obj), TypeError);
});
