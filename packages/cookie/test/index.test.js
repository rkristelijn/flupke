const { test } = require("node:test");
const assert = require("node:assert/strict");
const cookie = require("../src/index.js");
const origCookie = require("cookie");

test("parse simple cookies", () => {
  const result = cookie.parse("foo=bar; baz=qux");
  assert.equal(result.foo, "bar");
  assert.equal(result.baz, "qux");
});
test("parse encoded values", () => {
  const result = cookie.parse("foo=hello%20world");
  assert.equal(result.foo, "hello world");
});
test("parse empty string", () => {
  const result = cookie.parse("");
  assert.equal(Object.keys(result).length, 0);
});
test("parse ignores entries without =", () => {
  const result = cookie.parse("foo=bar; invalid; baz=qux");
  assert.equal(result.foo, "bar");
  assert.equal(result.baz, "qux");
  assert.equal(result.invalid, undefined);
});
test("parse handles = at position 0 (empty key)", () => {
  const result = cookie.parse("=nokey");
  assert.equal(result[""], "nokey");
});
test("serialize basic", () => {
  assert.equal(cookie.serialize("foo", "bar"), "foo=bar");
});
test("serialize with options", () => {
  const result = cookie.serialize("name", "value", {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  assert.ok(result.includes("HttpOnly"));
  assert.ok(result.includes("Secure"));
  assert.ok(result.includes("Path=/"));
});
test("matches original parse", () => {
  const str = "session=abc123; theme=dark; lang=en";
  const ours = cookie.parse(str);
  const orig = origCookie.parse(str);
  assert.equal(ours.session, orig.session);
  assert.equal(ours.theme, orig.theme);
  assert.equal(ours.lang, orig.lang);
});
test("matches original serialize", () => {
  assert.equal(cookie.serialize("a", "b"), origCookie.serialize("a", "b"));
});

test("parse returns empty for non-string", () => {
  assert.deepEqual(cookie.parse(null), {});
  assert.deepEqual(cookie.parse(undefined), {});
});

test("parse trims whitespace from keys and values", () => {
  const result = cookie.parse("  foo  =  bar  ");
  assert.strictEqual(result.foo, "bar");
});

test("parse strips quotes from values", () => {
  const result = cookie.parse('foo="bar"');
  assert.strictEqual(result.foo, "bar");
});

test("parse first value wins for duplicate keys", () => {
  const result = cookie.parse("a=1; a=2");
  assert.strictEqual(result.a, "1");
});

test("parse handles decode errors gracefully", () => {
  const result = cookie.parse("foo=%E0%A4%A");
  assert.ok("foo" in result);
});

test("serialize with maxAge", () => {
  const result = cookie.serialize("a", "b", { maxAge: 3600 });
  assert.ok(result.includes("Max-Age=3600"));
});

test("serialize with expires", () => {
  const d = new Date("2024-01-01");
  const result = cookie.serialize("a", "b", { expires: d });
  assert.ok(result.includes("Expires="));
});

test("serialize with sameSite string", () => {
  const result = cookie.serialize("a", "b", { sameSite: "Lax" });
  assert.ok(result.includes("SameSite=Lax"));
});

test("serialize with domain", () => {
  const result = cookie.serialize("a", "b", { domain: ".example.com" });
  assert.ok(result.includes("Domain=.example.com"));
});

test("serialize with custom encode", () => {
  const result = cookie.serialize("a", "hello world", { encode: (v) => v });
  assert.strictEqual(result, "a=hello world");
});
