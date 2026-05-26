const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const Negotiator = require("../src/index.js");

function mockReq(headers) {
  return { headers };
}

describe("negotiator", () => {
  describe("mediaTypes", () => {
    it("should return all media types sorted by quality", () => {
      const n = new Negotiator(
        mockReq({ accept: "text/html, application/json;q=0.9" }),
      );
      assert.deepStrictEqual(n.mediaTypes(), ["text/html", "application/json"]);
    });

    it("should filter by available", () => {
      const n = new Negotiator(
        mockReq({ accept: "text/html, application/json;q=0.9" }),
      );
      assert.deepStrictEqual(n.mediaTypes(["application/json", "text/html"]), [
        "text/html",
        "application/json",
      ]);
    });

    it("should handle wildcard", () => {
      const n = new Negotiator(mockReq({ accept: "*/*" }));
      assert.deepStrictEqual(n.mediaTypes(["text/html", "application/json"]), [
        "text/html",
        "application/json",
      ]);
    });

    it("should prefer higher quality", () => {
      const n = new Negotiator(
        mockReq({ accept: "text/html;q=0.5, application/json" }),
      );
      assert.strictEqual(
        n.mediaType(["text/html", "application/json"]),
        "application/json",
      );
    });
  });

  describe("languages", () => {
    it("should return all languages sorted by quality", () => {
      const n = new Negotiator(
        mockReq({ "accept-language": "en-US,en;q=0.9,nl;q=0.8" }),
      );
      assert.deepStrictEqual(n.languages(), ["en-US", "en", "nl"]);
    });

    it("should filter by available", () => {
      const n = new Negotiator(
        mockReq({ "accept-language": "en-US,nl;q=0.8" }),
      );
      assert.strictEqual(n.language(["en-US", "nl"]), "en-US");
    });
  });

  describe("encodings", () => {
    it("should return all encodings", () => {
      const n = new Negotiator(
        mockReq({ "accept-encoding": "gzip, deflate, br" }),
      );
      const encodings = n.encodings();
      assert.ok(encodings.includes("gzip"));
      assert.ok(encodings.includes("deflate"));
      assert.ok(encodings.includes("br"));
    });

    it("should include identity when no header", () => {
      const n = new Negotiator(mockReq({}));
      assert.deepStrictEqual(n.encodings(), ["identity"]);
    });

    it("should filter by available", () => {
      const n = new Negotiator(mockReq({ "accept-encoding": "gzip, br" }));
      assert.strictEqual(n.encoding(["gzip", "br"]), "gzip");
    });
  });

  describe("charsets", () => {
    it("should return all charsets", () => {
      const n = new Negotiator(
        mockReq({ "accept-charset": "utf-8, iso-8859-1;q=0.5" }),
      );
      assert.deepStrictEqual(n.charsets(), ["utf-8", "iso-8859-1"]);
    });

    it("should filter by available", () => {
      const n = new Negotiator(mockReq({ "accept-charset": "utf-8" }));
      assert.strictEqual(n.charset(["utf-8", "ascii"]), "utf-8");
    });
  });

  describe("edge cases", () => {
    it("should handle missing headers", () => {
      const n = new Negotiator(mockReq({}));
      assert.ok(n.mediaTypes().length > 0);
      assert.ok(n.languages().length > 0);
    });

    it("should handle q=0 (rejected)", () => {
      const n = new Negotiator(
        mockReq({ accept: "text/html;q=0, application/json" }),
      );
      assert.deepStrictEqual(n.mediaTypes(), ["application/json"]);
    });
  });
});
