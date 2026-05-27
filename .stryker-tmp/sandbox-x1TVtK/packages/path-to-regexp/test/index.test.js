// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const {
  match,
  pathToRegexp,
  compile,
  parse,
  stringify,
  TokenData,
  PathError,
} = require("../src/index.js");

describe("path-to-regexp", () => {
  describe("match", () => {
    it("should match static paths", () => {
      const fn = match("/test");
      const result = fn("/test");
      assert.strictEqual(result.path, "/test");
      assert.deepStrictEqual({ ...result.params }, {});
      assert.strictEqual(fn("/other"), false);
    });

    it("should match named parameters", () => {
      const fn = match("/user/:id");
      const result = fn("/user/123");
      assert.strictEqual(result.path, "/user/123");
      assert.strictEqual(result.params.id, "123");
    });

    it("should match multiple parameters", () => {
      const fn = match("/user/:id/post/:postId");
      const result = fn("/user/42/post/99");
      assert.strictEqual(result.params.id, "42");
      assert.strictEqual(result.params.postId, "99");
    });

    it("should decode parameters", () => {
      const fn = match("/file/:name");
      const result = fn("/file/hello%20world");
      assert.strictEqual(result.params.name, "hello world");
    });

    it("should support trailing slash option", () => {
      const fn = match("/test", { trailing: true });
      assert.ok(fn("/test"));
      assert.ok(fn("/test/"));
    });

    it("should support case sensitive option", () => {
      const fn = match("/Test", { sensitive: true });
      assert.ok(fn("/Test"));
      assert.strictEqual(fn("/test"), false);
    });

    it("should match wildcards", () => {
      const fn = match("/files/*path");
      const result = fn("/files/a/b/c");
      assert.strictEqual(result.params.path, "a/b/c");
    });
  });

  describe("pathToRegexp", () => {
    it("should return regexp and keys", () => {
      const { regexp, keys } = pathToRegexp("/user/:id");
      assert.ok(regexp instanceof RegExp);
      assert.strictEqual(keys.length, 1);
      assert.strictEqual(keys[0].name, "id");
    });
  });

  describe("compile", () => {
    it("should compile path with params", () => {
      const toPath = compile("/user/:id");
      assert.strictEqual(toPath({ id: "123" }), "/user/123");
    });

    it("should throw on missing param", () => {
      const toPath = compile("/user/:id");
      assert.throws(() => toPath({}), PathError);
    });
  });

  describe("parse", () => {
    it("should parse path into tokens", () => {
      const data = parse("/user/:id");
      assert.ok(data instanceof TokenData);
      assert.ok(data.tokens.length > 0);
    });
  });

  describe("stringify", () => {
    it("should convert tokens back to path", () => {
      const data = parse("/user/:id");
      assert.strictEqual(stringify(data), "/user/:id");
    });
  });
});
