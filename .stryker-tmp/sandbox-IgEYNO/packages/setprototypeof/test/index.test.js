// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const setprototypeof = require("../src/index.js");

describe("setprototypeof", () => {
  it("should set prototype", () => {
    const proto = {
      greet() {
        return "hello";
      },
    };
    const obj = {};
    setprototypeof(obj, proto);
    assert.strictEqual(obj.greet(), "hello");
  });

  it("should return the object", () => {
    const obj = {};
    const result = setprototypeof(obj, {});
    assert.strictEqual(result, obj);
  });

  it("should work with null prototype", () => {
    const obj = { a: 1 };
    setprototypeof(obj, null);
    assert.strictEqual(Object.getPrototypeOf(obj), null);
  });

  it("should work with existing properties", () => {
    const proto = { b: 2 };
    const obj = { a: 1 };
    setprototypeof(obj, proto);
    assert.strictEqual(obj.a, 1);
    assert.strictEqual(obj.b, 2);
  });
});
