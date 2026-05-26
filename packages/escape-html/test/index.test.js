const { test } = require("node:test");
const assert = require("node:assert/strict");
const escapeHtml = require("../src/index.js");
const origEscape = require("escape-html");

test("escapes &", () => {
  assert.equal(escapeHtml("a&b"), "a&amp;b");
});
test("escapes <>", () => {
  assert.equal(escapeHtml("<div>"), "&lt;div&gt;");
});
test("escapes quotes", () => {
  assert.equal(escapeHtml('"hi"'), "&quot;hi&quot;");
});
test("escapes single quotes", () => {
  assert.equal(escapeHtml("it's"), "it&#39;s");
});
test("no-op for safe strings", () => {
  assert.equal(escapeHtml("hello world"), "hello world");
});
test("handles empty string", () => {
  assert.equal(escapeHtml(""), "");
});
test("matches original for XSS payload", () => {
  const xss = '<script>alert("xss")</script>';
  assert.equal(escapeHtml(xss), origEscape(xss));
});
test("matches original for mixed content", () => {
  const s = "Price: $5 < $10 & \"cheap\" > 'free'";
  assert.equal(escapeHtml(s), origEscape(s));
});
