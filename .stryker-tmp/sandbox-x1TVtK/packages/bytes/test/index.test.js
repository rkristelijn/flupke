// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const bytes = require("../src/index.js");

describe("bytes", () => {
  describe("parse()", () => {
    it("should parse bytes", () => {
      assert.strictEqual(bytes.parse("1024"), 1024);
    });

    it("should parse KB", () => {
      assert.strictEqual(bytes.parse("1KB"), 1024);
      assert.strictEqual(bytes.parse("2 KB"), 2048);
    });

    it("should parse MB", () => {
      assert.strictEqual(bytes.parse("1MB"), 1024 * 1024);
    });

    it("should parse GB", () => {
      assert.strictEqual(bytes.parse("1GB"), 1024 * 1024 * 1024);
    });

    it("should parse case-insensitive", () => {
      assert.strictEqual(bytes.parse("1kb"), 1024);
      assert.strictEqual(bytes.parse("1Kb"), 1024);
    });

    it("should return null for invalid input", () => {
      assert.strictEqual(bytes.parse("invalid"), null);
      assert.strictEqual(bytes.parse("10x"), null);
    });

    it("should return null for non-string non-number", () => {
      assert.strictEqual(bytes.parse(null), null);
      assert.strictEqual(bytes.parse(undefined), null);
      assert.strictEqual(bytes.parse({}), null);
    });

    it("should pass through numbers (raw-body compatibility)", () => {
      assert.strictEqual(bytes.parse(1024), 1024);
      assert.strictEqual(bytes.parse(0), 0);
      assert.strictEqual(bytes.parse(100000), 100000);
    });
  });

  describe("format()", () => {
    it("should format bytes", () => {
      assert.strictEqual(bytes.format(1024), "1KB");
    });

    it("should format to bytes", () => {
      assert.strictEqual(bytes.format(500), "500B");
    });

    it("should format to MB", () => {
      assert.strictEqual(bytes.format(1024 * 1024), "1MB");
    });

    it("should format to GB", () => {
      assert.strictEqual(bytes.format(1024 * 1024 * 1024), "1GB");
    });

    it("should format 0", () => {
      assert.strictEqual(bytes.format(0), "0B");
    });

    it("should handle large numbers", () => {
      assert.strictEqual(bytes.format(1024 * 1024 * 1024 * 1024), "1TB");
    });

    it("should handle NaN", () => {
      assert.strictEqual(bytes.format(Number.NaN), "NaN");
    });

    it("should handle negative", () => {
      assert.strictEqual(bytes.format(-1), "-1");
    });

    it("should format fractional KB", () => {
      const result = bytes.format(1500);
      assert.ok(result.includes("KB"), `expected KB got ${result}`);
    });

    it("should format fractional MB", () => {
      const result = bytes.format(5.5 * 1024 * 1024);
      assert.ok(result.includes("MB"));
    });
  });

  describe("parse() edge cases", () => {
    it("should parse TB", () => {
      assert.strictEqual(bytes.parse("1TB"), 1024 * 1024 * 1024 * 1024);
    });

    it("should parse decimal values", () => {
      assert.strictEqual(bytes.parse("1.5KB"), Math.round(1.5 * 1024));
    });

    it("should parse PB", () => {
      assert.strictEqual(bytes.parse("1PB"), 1024 ** 5);
    });

    it("should return null for NaN number", () => {
      assert.strictEqual(bytes.parse(Number.NaN), null);
    });

    it("should return null for empty string", () => {
      assert.strictEqual(bytes.parse(""), null);
    });
  });
});
