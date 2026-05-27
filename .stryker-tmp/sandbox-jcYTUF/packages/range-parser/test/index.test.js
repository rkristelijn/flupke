// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const rangeParser = require("../src/index.js");

describe("range-parser", () => {
  it("should parse simple range", () => {
    const result = rangeParser(1000, "bytes=0-499");
    assert.deepStrictEqual(result, [{ start: 0, end: 500 }]);
  });

  it("should parse multiple ranges", () => {
    const result = rangeParser(1000, "bytes=0-99,200-299");
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].start, 0);
    assert.strictEqual(result[0].end, 100);
    assert.strictEqual(result[1].start, 200);
    assert.strictEqual(result[1].end, 300);
  });

  it("should parse suffix range", () => {
    const result = rangeParser(1000, "bytes=-500");
    assert.deepStrictEqual(result, [{ start: 500, end: 1000 }]);
  });

  it("should parse prefix range", () => {
    const result = rangeParser(1000, "bytes=500-");
    assert.deepStrictEqual(result, [{ start: 500, end: 1000 }]);
  });

  it("should return -1 for malformed range", () => {
    assert.strictEqual(rangeParser(1000, "invalid"), -1);
    assert.strictEqual(rangeParser(1000, "bytes="), -1);
  });

  it("should return -2 for unsatisfiable range", () => {
    assert.strictEqual(rangeParser(100, "bytes=500-999"), -2);
  });

  it("should combine overlapping ranges", () => {
    const result = rangeParser(1000, "bytes=0-100,50-150", { combine: true });
    assert.deepStrictEqual(result, [{ start: 0, end: 151 }]);
  });

  it("should handle range beyond size", () => {
    const result = rangeParser(100, "bytes=500-");
    assert.strictEqual(result, -2);
  });
});
