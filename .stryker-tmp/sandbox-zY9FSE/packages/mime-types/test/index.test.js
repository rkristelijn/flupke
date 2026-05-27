// @ts-nocheck
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const mime = require("../src/index.js");

describe("mime-types", () => {
  describe("lookup()", () => {
    it("should lookup by extension", () => {
      assert.strictEqual(mime.lookup(".html"), "text/html");
      assert.strictEqual(mime.lookup(".json"), "application/json");
    });

    it("should lookup by path", () => {
      assert.strictEqual(mime.lookup("file.txt"), "text/plain");
      assert.strictEqual(
        mime.lookup("/path/to/file.js"),
        "application/javascript",
      );
    });

    it("should return false for unknown", () => {
      assert.strictEqual(mime.lookup(".xyz"), false);
    });

    it("should return false for empty", () => {
      assert.strictEqual(mime.lookup(""), false);
    });

    it("should handle case insensitivity", () => {
      assert.strictEqual(mime.lookup(".HTML"), "text/html");
      assert.strictEqual(mime.lookup(".JSON"), "application/json");
    });

    it("should handle common image types", () => {
      assert.strictEqual(mime.lookup(".png"), "image/png");
      assert.strictEqual(mime.lookup(".jpg"), "image/jpeg");
      assert.strictEqual(mime.lookup(".gif"), "image/gif");
      assert.strictEqual(mime.lookup(".svg"), "image/svg+xml");
      assert.strictEqual(mime.lookup(".webp"), "image/webp");
    });

    it("should handle video types", () => {
      assert.strictEqual(mime.lookup(".mp4"), "video/mp4");
      assert.strictEqual(mime.lookup(".webm"), "video/webm");
      assert.strictEqual(mime.lookup(".avi"), "video/x-msvideo");
    });

    it("should handle font types", () => {
      assert.strictEqual(mime.lookup(".ttf"), "font/ttf");
      assert.strictEqual(mime.lookup(".woff"), "font/woff");
      assert.strictEqual(mime.lookup(".woff2"), "font/woff2");
    });
  });

  describe("contentType()", () => {
    it("should add charset for text types", () => {
      assert.strictEqual(
        mime.contentType("text/html"),
        "text/html; charset=utf-8",
      );
      assert.strictEqual(
        mime.contentType("text/css"),
        "text/css; charset=utf-8",
      );
    });

    it("should add charset for application/javascript", () => {
      assert.strictEqual(
        mime.contentType("application/javascript"),
        "application/javascript; charset=utf-8",
      );
    });

    it("should add charset for application/json", () => {
      assert.strictEqual(
        mime.contentType("application/json"),
        "application/json; charset=utf-8",
      );
    });

    it("should not add charset for binary types", () => {
      assert.strictEqual(mime.contentType("image/png"), "image/png");
      assert.strictEqual(mime.contentType("video/mp4"), "video/mp4");
    });

    it("should return original type for unknown", () => {
      assert.strictEqual(mime.contentType("unknown/type"), "unknown/type");
    });

    it("should handle lookup result", () => {
      assert.strictEqual(mime.contentType(".html"), "text/html; charset=utf-8");
    });
  });

  describe("extension()", () => {
    it("should get extension for MIME type", () => {
      assert.strictEqual(mime.extension("text/html"), ".ejs");
      assert.strictEqual(mime.extension("application/json"), ".json");
    });

    it("should return false for unknown", () => {
      assert.strictEqual(mime.extension("unknown/type"), false);
    });

    it("should handle common types", () => {
      assert.strictEqual(mime.extension("image/png"), ".png");
      assert.strictEqual(mime.extension("image/jpeg"), ".jpeg");
      assert.strictEqual(mime.extension("video/mp4"), ".f4v");
    });
  });

  describe("types property", () => {
    it("should have types object", () => {
      assert.ok(mime.types[".html"]);
      assert.ok(mime.types[".json"]);
      assert.strictEqual(mime.types[".html"], "text/html");
    });
  });

  describe("extensions property", () => {
    it("should have extensions object", () => {
      assert.ok(mime.extensions["text/html"]);
      assert.ok(mime.extensions["application/json"]);
      assert.strictEqual(mime.extensions["text/html"], ".ejs");
      assert.strictEqual(mime.extensions["video/mp4"], ".f4v");
    });
  });
});
