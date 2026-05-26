const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const pc = require("../src/index.js");
describe("picocolors", () => {
  it("has color functions", () => {
    assert.strictEqual(typeof pc.red, "function");
    assert.strictEqual(typeof pc.bold, "function");
  });
  it("returns string", () => {
    assert.strictEqual(typeof pc.red("hi"), "string");
  });
  it("has isColorSupported", () => {
    assert.strictEqual(typeof pc.isColorSupported, "boolean");
  });
});
