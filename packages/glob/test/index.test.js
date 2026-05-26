const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const glob = require("../src/index.js");

const cwd = path.resolve(__dirname, "..");

test("sync finds js files", () => {
  const results = glob.sync("src/*.js", { cwd });
  assert.ok(results.includes("src/index.js"));
});

test("sync finds test files", () => {
  const results = glob.sync("test/*.js", { cwd });
  assert.ok(results.includes("test/index.test.js"));
});

test("sync globstar", () => {
  const results = glob.sync("**/*.js", { cwd });
  assert.ok(results.length >= 2);
  assert.ok(results.includes("src/index.js"));
});

test("sync no match returns empty", () => {
  const results = glob.sync("*.xyz", { cwd });
  assert.deepStrictEqual(results, []);
});

test("async returns promise", async () => {
  const results = await glob("src/*.js", { cwd });
  assert.ok(results.includes("src/index.js"));
});

test("callback style", (t, done) => {
  glob("src/*.js", { cwd }, (err, results) => {
    assert.ifError(err);
    assert.ok(results.includes("src/index.js"));
    done();
  });
});

test("ignore option", () => {
  const results = glob.sync("**/*.js", { cwd, ignore: ["test/**"] });
  assert.ok(!results.some((f) => f.startsWith("test/")));
});

test("dot option", () => {
  const results = glob.sync("*", { cwd });
  const dotResults = glob.sync("*", { cwd, dot: true });
  assert.ok(dotResults.length >= results.length);
});
