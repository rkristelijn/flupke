// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const ms = require("../src/index.js");

test("parse: milliseconds", () => {
  assert.equal(ms("100ms"), 100);
  assert.equal(ms("50"), 50);
});

test("parse: seconds", () => {
  assert.equal(ms("1s"), 1000);
  assert.equal(ms("5s"), 5000);
  assert.equal(ms("0.5s"), 500);
});

test("parse: minutes", () => {
  assert.equal(ms("1m"), 60000);
  assert.equal(ms("2min"), 120000);
});

test("parse: hours", () => {
  assert.equal(ms("1h"), 3600000);
  assert.equal(ms("2hrs"), 7200000);
});

test("parse: days", () => {
  assert.equal(ms("1d"), 86400000);
  assert.equal(ms("2 days"), 172800000);
});

test("parse: weeks", () => {
  assert.equal(ms("1w"), 604800000);
});

test("parse: negative", () => {
  assert.equal(ms("-1s"), -1000);
});

test("format: short", () => {
  assert.equal(ms(1000), "1s");
  assert.equal(ms(60000), "1m");
  assert.equal(ms(3600000), "1h");
  assert.equal(ms(86400000), "1d");
  assert.equal(ms(500), "500ms");
});

test("format: long", () => {
  assert.equal(ms(1000, { long: true }), "1 second");
  assert.equal(ms(2000, { long: true }), "2 seconds");
  assert.equal(ms(86400000, { long: true }), "1 day");
});

test("throws on invalid input", () => {
  assert.throws(() => ms(undefined));
  assert.throws(() => ms(null));
  assert.throws(() => ms(""));
});

test("ReDoS safe: long input does not cause backtracking", () => {
  const start = performance.now();
  for (let i = 0; i < 1000; i++) ms(`${"9".repeat(1000)}z`);
  const elapsed = performance.now() - start;
  assert.ok(elapsed < 50, `Expected < 50ms, got ${elapsed.toFixed(1)}ms`);
});

test("parse: years", () => {
  const y = 365.25 * 24 * 60 * 60 * 1000;
  assert.equal(ms("1y"), y);
  assert.equal(ms("1 year"), y);
  assert.equal(ms("2years"), y * 2);
});

test("parse: returns undefined for invalid", () => {
  assert.strictEqual(ms("abc"), undefined);
  assert.strictEqual(ms("   "), undefined);
});

test("parse: trims whitespace", () => {
  assert.equal(ms("  1s  "), 1000);
});

test("parse: input > 100 chars returns undefined", () => {
  assert.strictEqual(ms("1" + "0".repeat(100) + "ms"), undefined);
});

test("parse: unit aliases", () => {
  assert.equal(ms("1sec"), 1000);
  assert.equal(ms("1second"), 1000);
  assert.equal(ms("2seconds"), 2000);
  assert.equal(ms("1minute"), 60000);
  assert.equal(ms("1hour"), 3600000);
  assert.equal(ms("1hr"), 3600000);
  assert.equal(ms("1day"), 86400000);
  assert.equal(ms("1week"), 604800000);
});

test("format short: boundary values", () => {
  assert.equal(ms(999), "999ms");
  assert.equal(ms(1000), "1s");
  assert.equal(ms(59000), "59s");
  assert.equal(ms(60000), "1m");
  assert.equal(ms(3540000), "59m");
  assert.equal(ms(3600000), "1h");
  assert.equal(ms(82800000), "23h");
  assert.equal(ms(86400000), "1d");
});

test("format short: negative values", () => {
  assert.equal(ms(-1000), "-1s");
  assert.equal(ms(-86400000), "-1d");
});

test("format long: plural vs singular", () => {
  assert.equal(ms(1000, { long: true }), "1 second");
  assert.equal(ms(1500, { long: true }), "2 seconds");
  assert.equal(ms(60000, { long: true }), "1 minute");
  assert.equal(ms(90000, { long: true }), "2 minutes");
  assert.equal(ms(3600000, { long: true }), "1 hour");
  assert.equal(ms(5400000, { long: true }), "2 hours");
  assert.equal(ms(86400000, { long: true }), "1 day");
  assert.equal(ms(129600000, { long: true }), "2 days");
});

test("format long: ms unit", () => {
  assert.equal(ms(500, { long: true }), "500 ms");
  assert.equal(ms(1, { long: true }), "1 ms");
});

test("throws on NaN", () => {
  assert.throws(() => ms(NaN));
});

test("throws on Infinity", () => {
  assert.throws(() => ms(Infinity));
});

test("parse: decimal values", () => {
  assert.equal(ms("1.5h"), 5400000);
  assert.equal(ms(".5d"), 43200000);
});
