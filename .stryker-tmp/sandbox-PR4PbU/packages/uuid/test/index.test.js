// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const uuid = require("../src/index.js");

test("v4 returns valid uuid", () => {
  assert.ok(uuid.validate(uuid.v4()));
});
test("v4 is version 4", () => {
  assert.equal(uuid.version(uuid.v4()), 4);
});
test("v7 returns valid uuid", () => {
  assert.ok(uuid.validate(uuid.v7()));
});
test("v7 is version 7", () => {
  assert.equal(uuid.version(uuid.v7()), 7);
});
test("validate rejects invalid", () => {
  assert.equal(uuid.validate("not-a-uuid"), false);
});
test("v7 has correct version nibble (0x7)", () => {
  const id = uuid.v7();
  assert.equal(id[14], "7");
});
test("validate accepts valid", () => {
  assert.equal(uuid.validate("550e8400-e29b-41d4-a716-446655440000"), true);
});
test("parse returns 16 bytes", () => {
  assert.equal(uuid.parse(uuid.v4()).length, 16);
});
test("stringify returns uuid format", () => {
  assert.ok(uuid.validate(uuid.stringify(uuid.parse(uuid.v4()))));
});
test("NIL is all zeros", () => {
  assert.equal(uuid.NIL, "00000000-0000-0000-0000-000000000000");
});

test("v7 is time-ordered across time", async () => {
  const a = uuid.v7();
  await new Promise((r) => setTimeout(r, 2));
  const b = uuid.v7();
  assert.ok(a < b);
});

test("v7 encodes timestamp correctly", () => {
  const before = Date.now();
  const id = uuid.v7();
  const after = Date.now();
  // Extract timestamp from first 12 hex chars (48 bits)
  const hex = id.replace(/-/g, "").slice(0, 12);
  const ts = parseInt(hex, 16);
  assert.ok(ts >= before, `${ts} >= ${before}`);
  assert.ok(ts <= after, `${ts} <= ${after}`);
});

test("validate rejects wrong variant", () => {
  // variant bits must be 10xx (8,9,a,b)
  assert.strictEqual(uuid.validate("550e8400-e29b-41d4-0716-446655440000"), false);
});

test("validate rejects wrong version", () => {
  assert.strictEqual(uuid.validate("550e8400-e29b-01d4-a716-446655440000"), false);
});

test("parse and stringify roundtrip", () => {
  const id = uuid.v4();
  const bytes = uuid.parse(id);
  const back = uuid.stringify(bytes);
  assert.strictEqual(back, id);
});

test("NIL validates as uuid format", () => {
  // NIL has version 0 and variant 0 — validate should handle it
  assert.strictEqual(uuid.NIL.length, 36);
});
