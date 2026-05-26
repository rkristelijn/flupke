const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const forwarded = require("../src/index.js");

function mockReq(remoteAddress, xForwardedFor) {
  return {
    headers:
      xForwardedFor !== undefined ? { "x-forwarded-for": xForwardedFor } : {},
    connection: { remoteAddress },
  };
}

describe("forwarded", () => {
  it("should throw on missing req", () => {
    assert.throws(() => forwarded(), TypeError);
    assert.throws(() => forwarded(null), TypeError);
  });

  it("should return socket address when no header", () => {
    assert.deepStrictEqual(forwarded(mockReq("1.2.3.4")), ["1.2.3.4"]);
  });

  it("should return socket address when header is empty", () => {
    assert.deepStrictEqual(forwarded(mockReq("1.2.3.4", "")), ["1.2.3.4"]);
  });

  it("should parse single forwarded address", () => {
    assert.deepStrictEqual(forwarded(mockReq("127.0.0.1", "10.0.0.1")), [
      "127.0.0.1",
      "10.0.0.1",
    ]);
  });

  it("should parse multiple forwarded addresses in reverse order", () => {
    const result = forwarded(mockReq("127.0.0.1", "10.0.0.1, 192.168.1.1"));
    assert.deepStrictEqual(result, ["127.0.0.1", "192.168.1.1", "10.0.0.1"]);
  });

  it("should trim whitespace from addresses", () => {
    const result = forwarded(mockReq("127.0.0.1", " 10.0.0.1 , 192.168.1.1 "));
    assert.deepStrictEqual(result, ["127.0.0.1", "192.168.1.1", "10.0.0.1"]);
  });
});
