const { test } = require("node:test");
const assert = require("node:assert/strict");
const spawn = require("../src/index.js");
test("spawns process", (t, done) => {
  const p = spawn("echo", ["hi"]);
  p.on("close", (code) => {
    assert.equal(code, 0);
    done();
  });
});
test("sync works", () => {
  const r = spawn.sync("echo", ["hi"]);
  assert.equal(r.status, 0);
});
test("returns ChildProcess", () => {
  const p = spawn("echo", ["x"]);
  assert.equal(typeof p.pid, "number");
  p.kill();
});
