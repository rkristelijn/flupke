const { test } = require("node:test");
const assert = require("node:assert/strict");
const debug = require("../src/index.js");

test("returns function", () => {
  assert.strictEqual(typeof debug("test"), "function");
});

test("has namespace property", () => {
  assert.strictEqual(debug("myapp").namespace, "myapp");
});

test("has enabled property", () => {
  process.env.DEBUG = "myapp";
  const d = debug("myapp");
  assert.strictEqual(d.enabled, true);
  process.env.DEBUG = "";
});

test("enabled returns false when DEBUG is empty", () => {
  process.env.DEBUG = "";
  assert.strictEqual(debug.enabled("foo"), false);
  delete process.env.DEBUG;
  assert.strictEqual(debug.enabled("foo"), false);
});

test("enabled returns true for exact match", () => {
  process.env.DEBUG = "foo";
  assert.strictEqual(debug.enabled("foo"), true);
  assert.strictEqual(debug.enabled("bar"), false);
  process.env.DEBUG = "";
});

test("enabled returns true for wildcard *", () => {
  process.env.DEBUG = "*";
  assert.strictEqual(debug.enabled("anything"), true);
  assert.strictEqual(debug.enabled(""), true);
  process.env.DEBUG = "";
});

test("enabled supports trailing glob", () => {
  process.env.DEBUG = "app:*";
  assert.strictEqual(debug.enabled("app:server"), true);
  assert.strictEqual(debug.enabled("app:db"), true);
  assert.strictEqual(debug.enabled("other:server"), false);
  assert.strictEqual(debug.enabled("app"), false);
  process.env.DEBUG = "";
});

test("enabled supports prefix glob", () => {
  process.env.DEBUG = "http*";
  assert.strictEqual(debug.enabled("http"), true);
  assert.strictEqual(debug.enabled("https"), true);
  assert.strictEqual(debug.enabled("ftp"), false);
  process.env.DEBUG = "";
});

test("enabled supports middle glob", () => {
  process.env.DEBUG = "app*end";
  assert.strictEqual(debug.enabled("app-middle-end"), true);
  assert.strictEqual(debug.enabled("append"), true);
  assert.strictEqual(debug.enabled("app-start"), false);
  process.env.DEBUG = "";
});

test("enabled supports comma-separated patterns", () => {
  process.env.DEBUG = "foo,bar";
  assert.strictEqual(debug.enabled("foo"), true);
  assert.strictEqual(debug.enabled("bar"), true);
  assert.strictEqual(debug.enabled("baz"), false);
  process.env.DEBUG = "";
});

test("enabled trims whitespace in patterns", () => {
  process.env.DEBUG = " foo , bar ";
  assert.strictEqual(debug.enabled("foo"), true);
  assert.strictEqual(debug.enabled("bar"), true);
  process.env.DEBUG = "";
});

test("writes to stderr when enabled", () => {
  process.env.DEBUG = "test:write";
  const d = debug("test:write");
  const chunks = [];
  const orig = process.stderr.write;
  process.stderr.write = (c) => chunks.push(c);
  d("hello");
  process.stderr.write = orig;
  assert.ok(chunks[0].includes("test:write"));
  assert.ok(chunks[0].includes("hello"));
  process.env.DEBUG = "";
});

test("does not write when disabled", () => {
  process.env.DEBUG = "";
  const d = debug("test:silent");
  const chunks = [];
  const orig = process.stderr.write;
  process.stderr.write = (c) => chunks.push(c);
  d("should not appear");
  process.stderr.write = orig;
  assert.strictEqual(chunks.length, 0);
});

test("handles non-string first arg", () => {
  process.env.DEBUG = "test:obj";
  const d = debug("test:obj");
  const chunks = [];
  const orig = process.stderr.write;
  process.stderr.write = (c) => chunks.push(c);
  d(42);
  process.stderr.write = orig;
  assert.ok(chunks[0].includes("test:obj"));
  process.env.DEBUG = "";
});

test("enabled returns false for non-matching glob", () => {
  process.env.DEBUG = "app:*";
  assert.strictEqual(debug.enabled("otherapp:foo"), false);
  process.env.DEBUG = "";
});

test("parts.length !== 2 falls through to false", () => {
  process.env.DEBUG = "a*b*c";
  assert.strictEqual(debug.enabled("aXbXc"), false);
  process.env.DEBUG = "";
});

test("output format includes namespace and message", () => {
  process.env.DEBUG = "fmt";
  const d = debug("fmt");
  const chunks = [];
  const orig = process.stderr.write;
  process.stderr.write = (c) => chunks.push(c);
  d("exact msg");
  process.stderr.write = orig;
  assert.strictEqual(chunks[0], "fmt exact msg\n");
  process.env.DEBUG = "";
});

test("non-string arg produces empty message prefix", () => {
  process.env.DEBUG = "ns";
  const d = debug("ns");
  const chunks = [];
  const orig = process.stderr.write;
  process.stderr.write = (c) => chunks.push(c);
  d(123);
  process.stderr.write = orig;
  assert.strictEqual(chunks[0], "ns \n");
  process.env.DEBUG = "";
});

test("enabled reads DEBUG env specifically", () => {
  const orig = process.env.DEBUG;
  process.env.DEBUG = "specific";
  assert.strictEqual(debug.enabled("specific"), true);
  assert.strictEqual(debug.enabled("other"), false);
  process.env.DEBUG = orig || "";
});

test("wildcard * does not match when DEBUG is empty string", () => {
  process.env.DEBUG = "";
  assert.strictEqual(debug.enabled("*"), false);
  process.env.DEBUG = "*";
  assert.strictEqual(debug.enabled("anything"), true);
  process.env.DEBUG = "";
});

test("trailing glob slices correctly", () => {
  process.env.DEBUG = "app:*";
  // "app:" prefix must match — not just "app"
  assert.strictEqual(debug.enabled("app:x"), true);
  assert.strictEqual(debug.enabled("app:"), true);
  assert.strictEqual(debug.enabled("appx"), false);
  assert.strictEqual(debug.enabled("ap"), false);
  process.env.DEBUG = "";
});

test("endsWith check matters for trailing glob", () => {
  process.env.DEBUG = "pre*";
  assert.strictEqual(debug.enabled("prefix"), true);
  assert.strictEqual(debug.enabled("pre"), true);
  assert.strictEqual(debug.enabled("xpre"), false);
  process.env.DEBUG = "";
});

test("middle glob requires both startsWith and endsWith", () => {
  process.env.DEBUG = "a*z";
  assert.strictEqual(debug.enabled("abcz"), true);
  assert.strictEqual(debug.enabled("az"), true);
  assert.strictEqual(debug.enabled("abc"), false);
  assert.strictEqual(debug.enabled("xaz"), false);
  process.env.DEBUG = "";
});
