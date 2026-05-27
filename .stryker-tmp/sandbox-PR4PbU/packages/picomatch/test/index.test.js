// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const pm = require("../src/index.js");
describe("picomatch", () => {
  it("matches globs", () => {
    assert.strictEqual(pm("*.js")("foo.js"), true);
    assert.strictEqual(pm("*.js")("foo.txt"), false);
  });
  it("matches double star", () => {
    assert.strictEqual(pm("**/*.js")("src/foo.js"), true);
  });
  it("isMatch", () => {
    assert.strictEqual(pm.isMatch("foo.js", "*.js"), true);
  });
  it("makeRe", () => {
    assert.ok(pm.makeRe("*.js") instanceof RegExp);
  });
  it("braces", () => {
    assert.strictEqual(pm("{a,b}.js")("a.js"), true);
    assert.strictEqual(pm("{a,b}.js")("c.js"), false);
  });
  it("question mark", () => {
    assert.strictEqual(pm("?.js")("a.js"), true);
    assert.strictEqual(pm("?.js")("ab.js"), false);
  });
});
