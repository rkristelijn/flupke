const { test } = require("node:test");
const assert = require("node:assert/strict");
const escalade = require("../src/index.js");
test("finds package.json", async () => {
  const r = await escalade(
    __dirname,
    (d, files) => files.includes("package.json") && "package.json",
  );
  assert.ok(r.endsWith("package.json"));
});
test("returns undefined at root", async () => {
  const r = await escalade("/", (d, files) => files.includes("nope-never"));
  assert.equal(r, undefined);
});
test("resolves full path", async () => {
  const path = require("node:path");
  const r = await escalade(
    __dirname,
    (d, f) => f.includes("package.json") && "package.json",
  );
  assert.ok(path.isAbsolute(r));
});
