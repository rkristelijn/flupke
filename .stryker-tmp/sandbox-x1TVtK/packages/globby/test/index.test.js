// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const globby = require("../src/index.js");
test("finds js files", () => {
  const r = globby("**/*.js", { cwd: `${__dirname}/../src` });
  assert.ok(r.length > 0);
});
test("returns array", () => {
  assert.ok(Array.isArray(globby("*.xyz", { cwd: __dirname })));
});
test("accepts array", () => {
  const r = globby(["**/*.js"], { cwd: `${__dirname}/../src` });
  assert.ok(r.length > 0);
});
