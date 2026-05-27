// @ts-nocheck
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

test("parse returns null for invalid", () => {
  assert.strictEqual(semver.parse("not-a-version"), null);
  assert.strictEqual(semver.parse("1.2"), null);
  assert.strictEqual(semver.parse(""), null);
});

test("parse extracts major/minor/patch correctly", () => {
  const v = semver.parse("10.20.30");
  assert.strictEqual(v.major, 10);
  assert.strictEqual(v.minor, 20);
  assert.strictEqual(v.patch, 30);
});

test("compare returns positive when a > b", () => {
  assert.ok(semver.compare("2.0.0", "1.0.0") > 0);
  assert.ok(semver.compare("1.1.0", "1.0.0") > 0);
  assert.ok(semver.compare("1.0.1", "1.0.0") > 0);
});

test("compare returns negative when a < b", () => {
  assert.ok(semver.compare("1.0.0", "2.0.0") < 0);
  assert.ok(semver.compare("1.0.0", "1.1.0") < 0);
  assert.ok(semver.compare("1.0.0", "1.0.1") < 0);
});

test("compare returns 0 for equal", () => {
  assert.strictEqual(semver.compare("1.2.3", "1.2.3"), 0);
});

test("prerelease sorts before release", () => {
  assert.ok(semver.compare("1.0.0-alpha", "1.0.0") < 0);
  assert.ok(semver.compare("1.0.0", "1.0.0-alpha") > 0);
});

test("gt/lt/eq", () => {
  assert.strictEqual(semver.gt("2.0.0", "1.0.0"), true);
  assert.strictEqual(semver.gt("1.0.0", "2.0.0"), false);
  assert.strictEqual(semver.lt("1.0.0", "2.0.0"), true);
  assert.strictEqual(semver.eq("1.0.0", "1.0.0"), true);
  assert.strictEqual(semver.eq("1.0.0", "1.0.1"), false);
});

test("satisfies basic range", () => {
  assert.strictEqual(semver.satisfies("1.2.3", ">=1.0.0"), true);
  assert.strictEqual(semver.satisfies("0.9.0", ">=1.0.0"), false);
});

test("valid returns cleaned version or null", () => {
  assert.strictEqual(semver.valid("1.2.3"), "1.2.3");
  assert.strictEqual(semver.valid("nope"), null);
});

test("compare with NaN for invalid input", () => {
  assert.ok(Number.isNaN(semver.compare("invalid", "1.0.0")));
});
