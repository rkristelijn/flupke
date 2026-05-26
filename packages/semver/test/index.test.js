const { test } = require("node:test");
const assert = require("node:assert/strict");
const semver = require("../src/index.js");

test("parses version", () => {
  const v = semver.parse("1.2.3");
  assert.deepStrictEqual(v, {
    major: 1,
    minor: 2,
    patch: 3,
    prerelease: "",
    version: "1.2.3",
  });
});

test("parses prerelease", () => {
  const v = semver.parse("1.2.3-beta.1");
  assert.strictEqual(v.prerelease, "beta.1");
});

test("compares versions", () => {
  assert.strictEqual(semver.gt("2.0.0", "1.0.0"), true);
  assert.strictEqual(semver.lt("1.0.0", "2.0.0"), true);
  assert.strictEqual(semver.eq("1.2.3", "1.2.3"), true);
});

test("satisfies range", () => {
  assert.strictEqual(semver.satisfies("1.2.3", "1.2.3"), true);
  assert.strictEqual(semver.satisfies("1.2.3", "1.2.0"), false);
});
