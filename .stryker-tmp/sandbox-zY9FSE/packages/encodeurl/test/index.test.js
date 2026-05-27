// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const encodeurl = require("../src/index.js");

describe("encodeurl", () => {
  it("should encode spaces", () => {
    assert.strictEqual(encodeurl("hello world"), "hello%20world");
  });

  it("should encode special characters", () => {
    assert.strictEqual(encodeurl("a<b>c"), "a%3Cb%3Ec");
    assert.strictEqual(encodeurl("foo#bar"), "foo%23bar");
    assert.strictEqual(encodeurl("test&value"), "test%26value");
  });

  it("should not double-encode already encoded sequences", () => {
    assert.strictEqual(encodeurl("%20"), "%20");
    assert.strictEqual(encodeurl("%E2%80%99"), "%E2%80%99");
  });

  it("should encode quotes", () => {
    assert.strictEqual(encodeurl('hello "world"'), "hello%20%22world%22");
  });

  it("should throw on non-string input", () => {
    assert.throws(() => encodeurl(123), TypeError);
    assert.throws(() => encodeurl(null), TypeError);
    assert.throws(() => encodeurl(undefined), TypeError);
  });

  it("should handle empty string", () => {
    assert.strictEqual(encodeurl(""), "");
  });

  it("should encode brackets and braces", () => {
    assert.strictEqual(encodeurl("a[b]{c}"), "a%5Bb%5D%7Bc%7D");
  });

  it("should encode forward slash", () => {
    assert.strictEqual(encodeurl("a/b"), "a%2Fb");
  });
});
