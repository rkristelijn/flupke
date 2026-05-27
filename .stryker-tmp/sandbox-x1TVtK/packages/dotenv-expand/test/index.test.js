// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { expand } = require("../src/index.js");

test("expands ${VAR} from parsed", () => {
  const r = expand({
    parsed: { A: "hello", B: "${A} world" },
    ignoreProcessEnv: true,
  });
  assert.equal(r.parsed.B, "hello world");
});
test("expands $VAR from parsed", () => {
  const r = expand({ parsed: { X: "val", Y: "$X!" }, ignoreProcessEnv: true });
  assert.equal(r.parsed.Y, "val!");
});
test("expands from process.env", () => {
  process.env.__TEST_EXP = "fromenv";
  const r = expand({ parsed: { Z: "${__TEST_EXP}/path" } });
  assert.equal(r.parsed.Z, "fromenv/path");
  process.env.__TEST_EXP = undefined;
});
test("supports default values ${VAR:-default}", () => {
  const r = expand({
    parsed: { D: "${NOPE:-fallback}" },
    ignoreProcessEnv: true,
  });
  assert.equal(r.parsed.D, "fallback");
});
test("returns config object", () => {
  const config = { parsed: { A: "1" } };
  assert.equal(expand(config), config);
});
test("exports expand as named export", () => {
  const mod = require("../src/index.js");
  assert.equal(typeof mod.expand, "function");
});
