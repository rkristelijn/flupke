const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const parseurl = require("../src/index.js");

describe("parseurl", () => {
  it("should parse URL from request", () => {
    const req = { url: "/path/to/resource?foo=bar" };
    const result = parseurl(req);
    assert.strictEqual(result.pathname, "/path/to/resource");
    assert.strictEqual(result.query, "foo=bar");
  });

  it("should cache parsed URL", () => {
    const req = { url: "/test" };
    const result1 = parseurl(req);
    const result2 = parseurl(req);
    assert.strictEqual(result1, result2);
  });

  it("should return undefined for missing url", () => {
    assert.strictEqual(parseurl({}), undefined);
  });

  it("should return undefined for null request", () => {
    assert.strictEqual(parseurl(null), undefined);
  });

  it("should parse original URL", () => {
    const req = { originalUrl: "/original/path" };
    const result = parseurl.original(req);
    assert.strictEqual(result.pathname, "/original/path");
  });

  it("should cache original URL separately", () => {
    const req = { url: "/url", originalUrl: "/original" };
    const result1 = parseurl(req);
    const result2 = parseurl.original(req);
    assert.strictEqual(result1.pathname, "/url");
    assert.strictEqual(result2.pathname, "/original");
  });

  it("should handle full URLs", () => {
    const req = { url: "http://example.com/path" };
    const result = parseurl(req);
    assert.strictEqual(result.hostname, "example.com");
  });
});
