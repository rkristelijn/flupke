// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const toIdentifier = require("../src/index.js");

describe("toidentifier", () => {
  it("should convert simple string", () => {
    assert.strictEqual(toIdentifier("foo bar"), "FooBar");
  });

  it("should handle hyphenated string", () => {
    assert.strictEqual(toIdentifier("foo-bar"), "Foobar");
  });

  it("should handle underscored string", () => {
    assert.strictEqual(toIdentifier("foo_bar"), "Foo_bar");
  });

  it("should handle mixed separators", () => {
    assert.strictEqual(toIdentifier("foo-bar_baz"), "Foobar_baz");
  });

  it("should preserve case within words", () => {
    assert.strictEqual(toIdentifier("FOO BAR"), "FOOBAR");
  });

  it("should handle single word", () => {
    assert.strictEqual(toIdentifier("hello"), "Hello");
  });

  it("should handle empty string", () => {
    assert.strictEqual(toIdentifier(""), "");
  });

  it("should handle leading numbers", () => {
    assert.strictEqual(toIdentifier("123abc"), "123abc");
  });

  it("should coerce non-string", () => {
    assert.strictEqual(toIdentifier(123), "123");
  });
});
