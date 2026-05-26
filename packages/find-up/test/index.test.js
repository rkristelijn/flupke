const { test } = require("node:test");
const assert = require("node:assert/strict");
const findUp = require("../src/index.js");
test("finds package.json", async () => {
  const r = await findUp("package.json", { cwd: __dirname });
  assert.ok(r.endsWith("package.json"));
});
test("returns undefined for missing", async () => {
  const r = await findUp("nonexistent-xyz-file");
  assert.equal(r, undefined);
});
test("returns absolute path", async () => {
  const path = require("node:path");
  const r = await findUp("package.json", { cwd: __dirname });
  assert.ok(path.isAbsolute(r));
});
