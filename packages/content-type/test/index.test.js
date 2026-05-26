const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { parse, format } = require("../src/index.js");

describe("content-type", () => {
  describe("parse", () => {
    it("should parse simple content type", () => {
      const result = parse("text/html");
      assert.strictEqual(result.type, "text/html");
      assert.deepStrictEqual(result.parameters, {});
    });

    it("should parse content type with charset", () => {
      const result = parse("text/html; charset=utf-8");
      assert.strictEqual(result.type, "text/html");
      assert.strictEqual(result.parameters.charset, "utf-8");
    });

    it("should parse content type with boundary", () => {
      const result = parse(
        "multipart/form-data; boundary=----WebKitFormBoundary",
      );
      assert.strictEqual(result.type, "multipart/form-data");
      assert.strictEqual(result.parameters.boundary, "----WebKitFormBoundary");
    });

    it("should handle quoted parameter values", () => {
      const result = parse('text/html; charset="utf-8"');
      assert.strictEqual(result.parameters.charset, "utf-8");
    });

    it("should parse from request object", () => {
      const result = parse({ headers: { "content-type": "application/json" } });
      assert.strictEqual(result.type, "application/json");
    });

    it("should return empty for missing content-type", () => {
      const result = parse({ headers: {} });
      assert.strictEqual(result.type, "");
    });
  });

  describe("format", () => {
    it("should format simple content type", () => {
      const result = format({ type: "text/html", parameters: {} });
      assert.strictEqual(result, "text/html");
    });

    it("should format with parameters", () => {
      const result = format({
        type: "text/html",
        parameters: { charset: "utf-8" },
      });
      assert.strictEqual(result, "text/html; charset=utf-8");
    });

    it("should handle special characters in value", () => {
      const result = format({
        type: "text/plain",
        parameters: { boundary: "abc;def" },
      });
      assert.strictEqual(result, 'text/plain; boundary="abc;def"');
    });

    it("should return empty for missing type", () => {
      const result = format({ type: "", parameters: {} });
      assert.strictEqual(result, "");
    });
  });
});
