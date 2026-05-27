// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const kleur = require("../src/index.js");

test("has enabled flag", () => {
  assert.strictEqual(typeof kleur.enabled, "boolean");
});

test("red wraps in ANSI", () => {
  kleur.enabled = true;
  assert.strictEqual(kleur.red("hi"), "\x1b[31mhi\x1b[39m");
});

test("bold", () => {
  kleur.enabled = true;
  assert.strictEqual(kleur.bold("hi"), "\x1b[1mhi\x1b[22m");
});

test("disabled returns plain text", () => {
  kleur.enabled = false;
  assert.strictEqual(kleur.red("hi"), "hi");
  kleur.enabled = true;
});

test("bgRed", () => {
  kleur.enabled = true;
  assert.strictEqual(kleur.bgRed("hi"), "\x1b[41mhi\x1b[49m");
});

test("gray and grey are same", () => {
  kleur.enabled = true;
  assert.strictEqual(kleur.gray("x"), kleur.grey("x"));
});

test("handles nested close codes", () => {
  kleur.enabled = true;
  const inner = kleur.red("a");
  const outer = kleur.blue(inner);
  assert.ok(outer.startsWith("\x1b[34m"));
  assert.ok(outer.endsWith("\x1b[39m"));
});

test("handles null/undefined", () => {
  kleur.enabled = true;
  assert.strictEqual(kleur.red(null), "");
  assert.strictEqual(kleur.red(undefined), "");
});

test("NO_COLOR disables", () => {
  process.env.NO_COLOR = "1";
  delete require.cache[require.resolve("../src/index.js")];
  const k = require("../src/index.js");
  assert.strictEqual(k.enabled, false);
  assert.strictEqual(k.red("x"), "x");
  delete process.env.NO_COLOR;
  delete require.cache[require.resolve("../src/index.js")];
});

test("FORCE_COLOR enables", () => {
  process.env.FORCE_COLOR = "1";
  delete process.env.NO_COLOR;
  delete require.cache[require.resolve("../src/index.js")];
  const k = require("../src/index.js");
  assert.strictEqual(k.enabled, true);
  assert.ok(k.red("x").includes("\x1b[31m"));
  delete process.env.FORCE_COLOR;
  delete require.cache[require.resolve("../src/index.js")];
});

test("FORCE_COLOR=0 disables", () => {
  process.env.FORCE_COLOR = "0";
  delete process.env.NO_COLOR;
  delete require.cache[require.resolve("../src/index.js")];
  const k = require("../src/index.js");
  // With FORCE_COLOR=0 and no TTY, colors should be disabled
  assert.strictEqual(k.red("x"), "x");
  delete process.env.FORCE_COLOR;
  delete require.cache[require.resolve("../src/index.js")];
});

test("TERM=dumb disables", () => {
  const orig = process.env.TERM;
  process.env.TERM = "dumb";
  delete process.env.FORCE_COLOR;
  delete process.env.NO_COLOR;
  delete require.cache[require.resolve("../src/index.js")];
  const k = require("../src/index.js");
  assert.strictEqual(k.enabled, false);
  process.env.TERM = orig;
  delete require.cache[require.resolve("../src/index.js")];
});

test("nested ANSI codes are re-opened", () => {
  kleur.enabled = true;
  const inner = kleur.red("inner");
  const outer = kleur.blue(inner);
  // blue should re-open after red's close
  assert.ok(outer.includes("\x1b[34m"));
  assert.ok(outer.includes("\x1b[31m"));
});

test("empty string returns empty", () => {
  kleur.enabled = true;
  assert.strictEqual(kleur.red(""), "");
});
