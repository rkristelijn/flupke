const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const etag = require("../src/index.js");

describe("etag", () => {
  it("should generate strong etag for string", () => {
    const result = etag("hello");
    assert.ok(result.startsWith('"'));
    assert.ok(!result.startsWith('W/"'));
  });

  it("should generate weak etag when weak option is true", () => {
    const result = etag("hello", { weak: true });
    assert.ok(result.startsWith('W/"'));
  });

  it("should generate etag for Buffer", () => {
    const result = etag(Buffer.from("hello"));
    assert.ok(result.startsWith('"'));
  });

  it("should generate consistent etag for same input", () => {
    const result1 = etag("hello");
    const result2 = etag("hello");
    assert.strictEqual(result1, result2);
  });

  it("should generate different etag for different input", () => {
    const result1 = etag("hello");
    const result2 = etag("world");
    assert.notStrictEqual(result1, result2);
  });

  it("should throw on null input", () => {
    assert.throws(() => etag(null), TypeError);
  });

  it("should throw on undefined input", () => {
    assert.throws(() => etag(undefined), TypeError);
  });

  it("should throw on non-string/buffer/object input", () => {
    assert.throws(() => etag(123), TypeError);
  });
});

  it("should throw with correct message on null", () => {
    assert.throws(() => etag(null), { message: /must not be null/ });
  });

  it("should throw with correct message on undefined", () => {
    assert.throws(() => etag(undefined), { message: /must not be null/ });
  });

  it("should handle Stats object", () => {
    const stat = { ino: 1234, size: 5678, mtime: new Date("2024-01-01") };
    const result = etag(stat);
    assert.ok(result.startsWith('"'));
    assert.ok(result.endsWith('"'));
    assert.ok(result.length > 5);
  });

  it("should generate weak etag for Stats", () => {
    const stat = { ino: 1, size: 100, mtime: new Date() };
    const result = etag(stat, { weak: true });
    assert.ok(result.startsWith('W/"'));
  });

  it("should generate weak etag for Buffer", () => {
    const result = etag(Buffer.from("test"), { weak: true });
    assert.ok(result.startsWith('W/"'));
  });

  it("strong etag does not have W/ prefix", () => {
    assert.ok(!etag("x").startsWith("W/"));
    assert.ok(!etag(Buffer.from("x")).startsWith("W/"));
  });

  it("different Stats produce different etags", () => {
    const s1 = { ino: 1, size: 100, mtime: new Date("2024-01-01") };
    const s2 = { ino: 2, size: 100, mtime: new Date("2024-01-01") };
    assert.notStrictEqual(etag(s1), etag(s2));
  });

  it("etag format is quoted string", () => {
    const result = etag("hello");
    assert.match(result, /^"[^"]+"$/);
  });
