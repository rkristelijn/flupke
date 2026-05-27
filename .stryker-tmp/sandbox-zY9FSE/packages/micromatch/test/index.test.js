// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const mm = require("../src/index.js");

test("match glob patterns", () => {
  assert.deepStrictEqual(mm(["foo.js", "bar.ts", "baz.js"], "*.js"), [
    "foo.js",
    "baz.js",
  ]);
});

test("match with globstar", () => {
  assert.deepStrictEqual(mm(["a/b/c.js", "a/d.js", "b.js"], "a/**/*.js"), [
    "a/b/c.js",
    "a/d.js",
  ]);
});

test("negation patterns", () => {
  assert.deepStrictEqual(mm(["a.js", "b.js", "c.ts"], ["*.js", "!b.js"]), [
    "a.js",
  ]);
});

test("brace expansion", () => {
  assert.deepStrictEqual(mm(["a.js", "a.ts", "a.css"], "*.{js,ts}"), [
    "a.js",
    "a.ts",
  ]);
});

test("isMatch", () => {
  assert.strictEqual(mm.isMatch("foo.js", "*.js"), true);
  assert.strictEqual(mm.isMatch("foo.ts", "*.js"), false);
});

test("isMatch with braces", () => {
  assert.strictEqual(mm.isMatch("foo.js", "*.{js,ts}"), true);
});

test("not", () => {
  assert.deepStrictEqual(mm.not(["a.js", "b.js", "c.ts"], "*.js"), ["c.ts"]);
});

test("nocase option", () => {
  assert.deepStrictEqual(mm(["FOO.JS", "bar.js"], "*.js", { nocase: true }), [
    "FOO.JS",
    "bar.js",
  ]);
});

test("makeRe", () => {
  const re = mm.makeRe("*.js");
  assert.ok(re instanceof RegExp);
  assert.ok(re.test("foo.js"));
});

test("array of patterns", () => {
  assert.deepStrictEqual(mm(["a.js", "b.ts", "c.css"], ["*.js", "*.ts"]), [
    "a.js",
    "b.ts",
  ]);
});
