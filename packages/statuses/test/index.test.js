const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const statuses = require("../src/index.js");

describe("statuses", () => {
  it("should return message for valid code", () => {
    assert.strictEqual(statuses(200), "OK");
    assert.strictEqual(statuses(404), "Not Found");
    assert.strictEqual(statuses(500), "Internal Server Error");
  });

  it("should return code for valid message", () => {
    assert.strictEqual(statuses("ok"), 200);
    assert.strictEqual(statuses("not found"), 404);
    assert.strictEqual(statuses("internal server error"), 500);
  });

  it("should return null for invalid code", () => {
    assert.strictEqual(statuses(999), null);
  });

  it("should return null for invalid message", () => {
    assert.strictEqual(statuses("invalid status"), null);
  });

  it("should have message property", () => {
    assert.strictEqual(statuses.message[200], "OK");
    assert.strictEqual(statuses.message[404], "Not Found");
  });

  it("should have code property", () => {
    assert.strictEqual(statuses.code.ok, 200);
    assert.strictEqual(statuses.code["not found"], 404);
  });

  it("should have redirect property", () => {
    assert.strictEqual(statuses.redirect[301], true);
    assert.strictEqual(statuses.redirect[302], true);
    assert.strictEqual(statuses.redirect[303], true);
    assert.strictEqual(statuses.redirect[307], true);
    assert.strictEqual(statuses.redirect[308], true);
    assert.strictEqual(statuses.redirect[200], undefined);
    assert.strictEqual(statuses.redirect[404], undefined);
  });

  it("should have empty property", () => {
    assert.strictEqual(statuses.empty[204], true);
    assert.strictEqual(statuses.empty[205], true);
    assert.strictEqual(statuses.empty[304], true);
    assert.strictEqual(statuses.empty[200], undefined);
    assert.strictEqual(statuses.empty[404], undefined);
  });

  it("should have retry property", () => {
    assert.strictEqual(statuses.retry[408], true);
    assert.strictEqual(statuses.retry[429], true);
    assert.strictEqual(statuses.retry[500], true);
    assert.strictEqual(statuses.retry[502], true);
    assert.strictEqual(statuses.retry[503], true);
    assert.strictEqual(statuses.retry[504], true);
    assert.strictEqual(statuses.retry[200], undefined);
    assert.strictEqual(statuses.retry[404], undefined);
  });

  it("should throw on invalid argument type", () => {
    assert.throws(() => statuses(null), TypeError);
    assert.throws(() => statuses({}), TypeError);
  });

  it("should have codes array with all numeric status codes", () => {
    assert.ok(Array.isArray(statuses.codes));
    assert.ok(statuses.codes.length > 60);
    assert.ok(statuses.codes.includes(200));
    assert.ok(statuses.codes.includes(404));
    assert.ok(statuses.codes.includes(500));
    assert.ok(statuses.codes.every((c) => typeof c === "number"));
  });

  it("should be compatible with http-errors usage pattern", () => {
    // http-errors does: statuses.codes.forEach(code => { statuses.message[code] })
    const messages = [];
    statuses.codes.forEach((code) => {
      messages.push(statuses.message[code]);
    });
    assert.ok(messages.every((m) => typeof m === "string"));
    assert.ok(messages.includes("OK"));
    assert.ok(messages.includes("Not Found"));
  });
});
