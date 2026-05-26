const { test } = require("node:test");
const assert = require("node:assert/strict");
const minimatch = require("../src/index.js");

test("basic glob", () => {
  assert.strictEqual(minimatch("foo.js", "*.js"), true);
  assert.strictEqual(minimatch("foo.ts", "*.js"), false);
});

test("globstar", () => {
  assert.strictEqual(minimatch("a/b/c.js", "**/*.js"), true);
  assert.strictEqual(minimatch("a/b/c.ts", "**/*.js"), false);
});

test("question mark", () => {
  assert.strictEqual(minimatch("a.js", "?.js"), true);
  assert.strictEqual(minimatch("ab.js", "?.js"), false);
});

test("negation", () => {
  assert.strictEqual(minimatch("foo.js", "!*.ts"), true);
  assert.strictEqual(minimatch("foo.ts", "!*.ts"), false);
});

test("brace expansion", () => {
  assert.strictEqual(minimatch("foo.js", "*.{js,ts}"), true);
  assert.strictEqual(minimatch("foo.ts", "*.{js,ts}"), true);
  assert.strictEqual(minimatch("foo.css", "*.{js,ts}"), false);
});

test("nocase option", () => {
  assert.strictEqual(minimatch("FOO.JS", "*.js", { nocase: true }), true);
});

test("Minimatch class", () => {
  const m = new minimatch.Minimatch("*.js");
  assert.strictEqual(m.match("foo.js"), true);
  assert.strictEqual(m.match("foo.ts"), false);
});

test("filter", () => {
  const fn = minimatch.filter("*.js");
  assert.strictEqual(fn("a.js"), true);
  assert.strictEqual(fn("a.ts"), false);
});

test("match list", () => {
  assert.deepStrictEqual(minimatch.match(["a.js", "b.ts", "c.js"], "*.js"), [
    "a.js",
    "c.js",
  ]);
});

test("makeRe", () => {
  const re = minimatch.makeRe("*.js");
  assert.ok(re instanceof RegExp);
  assert.ok(re.test("foo.js"));
});

test("character class", () => {
  assert.strictEqual(minimatch("a.js", "[abc].js"), true);
  assert.strictEqual(minimatch("d.js", "[abc].js"), false);
});

test("path separators", () => {
  assert.strictEqual(minimatch("src/foo.js", "src/*.js"), true);
  assert.strictEqual(minimatch("lib/foo.js", "src/*.js"), false);
});

test("negation with !", () => {
  assert.strictEqual(minimatch("foo.js", "!*.ts"), true);
  assert.strictEqual(minimatch("foo.ts", "!*.ts"), false);
  assert.strictEqual(minimatch("foo.js", "!foo.js"), false);
});

test("globstar matches nested paths", () => {
  assert.strictEqual(minimatch("a/b/c/d.js", "**/*.js"), true);
  assert.strictEqual(minimatch("d.js", "**/*.js"), true);
  assert.strictEqual(minimatch("a/b.ts", "**/*.js"), false);
});

test("question mark matches single char only", () => {
  assert.strictEqual(minimatch("ab.js", "??.js"), true);
  assert.strictEqual(minimatch("abc.js", "??.js"), false);
  assert.strictEqual(minimatch("a.js", "??.js"), false);
});

test("character class [abc]", () => {
  assert.strictEqual(minimatch("a.js", "[abc].js"), true);
  assert.strictEqual(minimatch("b.js", "[abc].js"), true);
  assert.strictEqual(minimatch("d.js", "[abc].js"), false);
});

test("unclosed bracket treated as literal", () => {
  assert.strictEqual(minimatch("[.js", "[.js"), true);
});

test("path with multiple segments", () => {
  assert.strictEqual(minimatch("src/lib/foo.js", "src/**/*.js"), true);
  assert.strictEqual(minimatch("test/foo.js", "src/**/*.js"), false);
});

test("special regex chars in pattern are escaped", () => {
  assert.strictEqual(minimatch("file.js", "file.js"), true);
  assert.strictEqual(minimatch("filexjs", "file.js"), false);
});

test("Minimatch negate property", () => {
  const m = new minimatch.Minimatch("!*.ts");
  assert.strictEqual(m.negate, true);
  assert.strictEqual(m.match("foo.js"), true);
  assert.strictEqual(m.match("foo.ts"), false);
});

test("match returns filtered array", () => {
  const files = ["a.js", "b.ts", "c.js", "d.css"];
  assert.deepStrictEqual(minimatch.match(files, "*.{js,ts}"), ["a.js", "b.ts", "c.js"]);
});
