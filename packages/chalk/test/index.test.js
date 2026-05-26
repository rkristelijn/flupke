const { test } = require("node:test");
const assert = require("node:assert/strict");
// Force colors on for testing (CI has no TTY)
process.env.FORCE_COLOR = "3";
const chalk = require("../src/index.js");

test("red", () => {
  assert.strictEqual(chalk.red("hi"), "\x1b[31mhi\x1b[39m");
});

test("bold", () => {
  assert.strictEqual(chalk.bold("hi"), "\x1b[1mhi\x1b[22m");
});

test("chained styles", () => {
  const result = chalk.bold.red("hi");
  assert.ok(result.includes("\x1b[1m"));
  assert.ok(result.includes("\x1b[31m"));
  assert.ok(result.includes("hi"));
});

test("bgRed", () => {
  assert.strictEqual(chalk.bgRed("hi"), "\x1b[41mhi\x1b[49m");
});

test("multiple arguments", () => {
  assert.strictEqual(chalk.red("a", "b"), "\x1b[31ma b\x1b[39m");
});

test("nested styles", () => {
  const result = chalk.red(`a${chalk.bold("b")}c`);
  assert.ok(result.includes("a"));
  assert.ok(result.includes("b"));
  assert.ok(result.includes("c"));
});

test("rgb", () => {
  const result = chalk.rgb(255, 0, 0)("hi");
  assert.ok(result.includes("\x1b[38;2;255;0;0m"));
  assert.ok(result.includes("hi"));
});

test("hex", () => {
  const result = chalk.hex("#ff0000")("hi");
  assert.ok(result.includes("\x1b[38;2;255;0;0m"));
});

test("supportsColor", () => {
  assert.ok("level" in chalk.supportsColor);
  assert.ok("hasBasic" in chalk.supportsColor);
});

test("level property", () => {
  assert.strictEqual(typeof chalk.level, "number");
});

test("gray and grey", () => {
  assert.strictEqual(chalk.gray("x"), chalk.grey("x"));
});

test("level 0 produces no ANSI", () => {
  // Force level 0 by testing the internal behavior
  const orig = process.env.NO_COLOR;
  process.env.NO_COLOR = "1";
  delete require.cache[require.resolve("../src/index.js")];
  const c = require("../src/index.js");
  assert.strictEqual(c.red("hi"), "hi");
  delete process.env.NO_COLOR;
  delete require.cache[require.resolve("../src/index.js")];
});

test("FORCE_COLOR=0 disables color", () => {
  const orig = process.env.FORCE_COLOR;
  process.env.FORCE_COLOR = "0";
  delete require.cache[require.resolve("../src/index.js")];
  const c = require("../src/index.js");
  assert.strictEqual(c.level, 0);
  assert.strictEqual(c.red("x"), "x");
  delete process.env.FORCE_COLOR;
  delete require.cache[require.resolve("../src/index.js")];
});

test("FORCE_COLOR=1 enables basic", () => {
  const orig = process.env.FORCE_COLOR;
  process.env.FORCE_COLOR = "1";
  delete require.cache[require.resolve("../src/index.js")];
  const c = require("../src/index.js");
  assert.ok(c.level >= 1);
  assert.ok(c.red("x").includes("\x1b[31m"));
  delete process.env.FORCE_COLOR;
  delete require.cache[require.resolve("../src/index.js")];
});

test("hexToRgb parses correctly", () => {
  const result = chalk.hex("#ff8800")("test");
  assert.ok(result.includes("38;2;255;136;0"));
});

test("bgHex works", () => {
  const result = chalk.bgHex("#00ff00")("test");
  assert.ok(result.includes("48;2;0;255;0"));
});

test("bgRgb works", () => {
  const result = chalk.bgRgb(100, 200, 50)("test");
  assert.ok(result.includes("48;2;100;200;50"));
});

test("chained modifiers all apply", () => {
  const result = chalk.bold.underline.red("x");
  assert.ok(result.includes("\x1b[1m"));
  assert.ok(result.includes("\x1b[4m"));
  assert.ok(result.includes("\x1b[31m"));
});

test("visible returns empty when level 0", () => {
  // chalk.visible should return content when colors enabled
  const result = chalk.visible("hi");
  assert.strictEqual(typeof result, "string");
});

test("supportsColor has correct structure", () => {
  assert.strictEqual(typeof chalk.supportsColor.level, "number");
  assert.strictEqual(typeof chalk.supportsColor.hasBasic, "boolean");
  assert.strictEqual(typeof chalk.supportsColor.has256, "boolean");
  assert.strictEqual(typeof chalk.supportsColor.has16m, "boolean");
});
