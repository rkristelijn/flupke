// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const parse = require("../src/index.js");
test("flags", () => {
  const r = parse(["--verbose", "--name", "foo"]);
  assert.equal(r.verbose, true);
  assert.equal(r.name, "foo");
});
test("key=value", () => {
  const r = parse(["--port=3000"]);
  assert.equal(r.port, "3000");
});
test("positionals", () => {
  const r = parse(["cmd", "arg1", "--flag"]);
  assert.deepEqual(r._, ["cmd", "arg1"]);
  assert.equal(r.flag, true);
});
test("no- prefix", () => {
  const r = parse(["--no-color"]);
  assert.equal(r.color, false);
});
test("short flags", () => {
  const r = parse(["-abc"]);
  assert.equal(r.a, true);
  assert.equal(r.b, true);
  assert.equal(r.c, true);
});
