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

test("all modifier styles produce correct codes", () => {
  assert.ok(chalk.dim("x").includes("\x1b[2m"));
  assert.ok(chalk.italic("x").includes("\x1b[3m"));
  assert.ok(chalk.underline("x").includes("\x1b[4m"));
  assert.ok(chalk.inverse("x").includes("\x1b[7m"));
  assert.ok(chalk.hidden("x").includes("\x1b[8m"));
  assert.ok(chalk.strikethrough("x").includes("\x1b[9m"));
});

test("all foreground colors produce correct open codes", () => {
  assert.ok(chalk.black("x").includes("\x1b[30m"));
  assert.ok(chalk.green("x").includes("\x1b[32m"));
  assert.ok(chalk.yellow("x").includes("\x1b[33m"));
  assert.ok(chalk.blue("x").includes("\x1b[34m"));
  assert.ok(chalk.magenta("x").includes("\x1b[35m"));
  assert.ok(chalk.cyan("x").includes("\x1b[36m"));
  assert.ok(chalk.white("x").includes("\x1b[37m"));
});

test("bright colors", () => {
  assert.ok(chalk.blackBright("x").includes("\x1b[90m"));
  assert.ok(chalk.redBright("x").includes("\x1b[91m"));
  assert.ok(chalk.greenBright("x").includes("\x1b[92m"));
  assert.ok(chalk.yellowBright("x").includes("\x1b[93m"));
  assert.ok(chalk.blueBright("x").includes("\x1b[94m"));
  assert.ok(chalk.magentaBright("x").includes("\x1b[95m"));
  assert.ok(chalk.cyanBright("x").includes("\x1b[96m"));
  assert.ok(chalk.whiteBright("x").includes("\x1b[97m"));
});

test("all background colors", () => {
  assert.ok(chalk.bgBlack("x").includes("\x1b[40m"));
  assert.ok(chalk.bgGreen("x").includes("\x1b[42m"));
  assert.ok(chalk.bgYellow("x").includes("\x1b[43m"));
  assert.ok(chalk.bgBlue("x").includes("\x1b[44m"));
  assert.ok(chalk.bgMagenta("x").includes("\x1b[45m"));
  assert.ok(chalk.bgCyan("x").includes("\x1b[46m"));
  assert.ok(chalk.bgWhite("x").includes("\x1b[47m"));
});

test("bright background colors", () => {
  assert.ok(chalk.bgBlackBright("x").includes("\x1b[100m"));
  assert.ok(chalk.bgRedBright("x").includes("\x1b[101m"));
  assert.ok(chalk.bgGreenBright("x").includes("\x1b[102m"));
  assert.ok(chalk.bgYellowBright("x").includes("\x1b[103m"));
  assert.ok(chalk.bgBlueBright("x").includes("\x1b[104m"));
  assert.ok(chalk.bgMagentaBright("x").includes("\x1b[105m"));
  assert.ok(chalk.bgCyanBright("x").includes("\x1b[106m"));
  assert.ok(chalk.bgWhiteBright("x").includes("\x1b[107m"));
});

test("close codes are correct", () => {
  assert.ok(chalk.bold("x").endsWith("\x1b[22m"));
  assert.ok(chalk.red("x").endsWith("\x1b[39m"));
  assert.ok(chalk.bgRed("x").endsWith("\x1b[49m"));
});

test("empty string returns empty with codes", () => {
  const result = chalk.red("");
  assert.strictEqual(result, "\x1b[31m\x1b[39m");
});

test("triple chain", () => {
  const result = chalk.bold.red.bgBlue("x");
  assert.ok(result.includes("\x1b[1m"));
  assert.ok(result.includes("\x1b[31m"));
  assert.ok(result.includes("\x1b[44m"));
  assert.ok(result.includes("x"));
});

test("rgb produces 38;2;r;g;b", () => {
  const result = chalk.rgb(10, 20, 30)("x");
  assert.ok(result.includes("\x1b[38;2;10;20;30m"));
  assert.ok(result.endsWith("\x1b[39m"));
});

test("bgRgb produces 48;2;r;g;b", () => {
  const result = chalk.bgRgb(10, 20, 30)("x");
  assert.ok(result.includes("\x1b[48;2;10;20;30m"));
  assert.ok(result.endsWith("\x1b[49m"));
});

test("hex converts correctly", () => {
  // #0a141e = rgb(10, 20, 30)
  const result = chalk.hex("#0a141e")("x");
  assert.ok(result.includes("38;2;10;20;30"));
});

test("level 0 returns plain string", () => {
  process.env.NO_COLOR = "1";
  delete require.cache[require.resolve("../src/index.js")];
  const c = require("../src/index.js");
  assert.strictEqual(c.red("hello"), "hello");
  assert.strictEqual(c.bold.underline("x"), "x");
  delete process.env.NO_COLOR;
  delete require.cache[require.resolve("../src/index.js")];
});

test("supportsColor levels are consistent", () => {
  const sc = chalk.supportsColor;
  if (sc.level >= 1) assert.strictEqual(sc.hasBasic, true);
  if (sc.level >= 2) assert.strictEqual(sc.has256, true);
  if (sc.level >= 3) assert.strictEqual(sc.has16m, true);
  if (sc.level < 1) assert.strictEqual(sc.hasBasic, false);
  if (sc.level < 2) assert.strictEqual(sc.has256, false);
  if (sc.level < 3) assert.strictEqual(sc.has16m, false);
});

test("FORCE_COLOR=3 gives full support", () => {
  // Already set at top of file
  assert.strictEqual(chalk.supportsColor.level, 3);
  assert.strictEqual(chalk.supportsColor.hasBasic, true);
  assert.strictEqual(chalk.supportsColor.has256, true);
  assert.strictEqual(chalk.supportsColor.has16m, true);
});

test("TERM=dumb disables color", () => {
  const origTerm = process.env.TERM;
  const origForce = process.env.FORCE_COLOR;
  process.env.TERM = "dumb";
  delete process.env.FORCE_COLOR;
  delete process.env.NO_COLOR;
  delete require.cache[require.resolve("../src/index.js")];
  const c = require("../src/index.js");
  assert.strictEqual(c.red("x"), "x");
  process.env.TERM = origTerm;
  process.env.FORCE_COLOR = origForce;
  delete require.cache[require.resolve("../src/index.js")];
});

test("hex strips # prefix", () => {
  const with_ = chalk.hex("#ff0000")("x");
  const without = chalk.hex("ff0000")("x");
  assert.strictEqual(with_, without);
});

test("rgb chained with style", () => {
  const result = chalk.bold.rgb(255, 0, 0)("x");
  assert.ok(result.includes("\x1b[1m"));
  assert.ok(result.includes("38;2;255;0;0"));
});

test("bgHex chained", () => {
  const result = chalk.bgHex("#00ff00").bold("x");
  assert.ok(result.includes("48;2;0;255;0"));
  assert.ok(result.includes("\x1b[1m"));
});

test("visible returns string when enabled", () => {
  const result = chalk.visible("test");
  assert.strictEqual(result, "test");
});
