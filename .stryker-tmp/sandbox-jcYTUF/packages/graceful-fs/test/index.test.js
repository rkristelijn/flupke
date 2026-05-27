// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const gfs = require("../src/index.js");
test("readFile works", (t, done) => {
  gfs.readFile(__filename, "utf8", (err, data) => {
    assert.equal(err, null);
    assert.ok(data.includes("readFile"));
    done();
  });
});
test("stat works", (t, done) => {
  gfs.stat(__filename, (err, s) => {
    assert.equal(err, null);
    assert.ok(s.isFile());
    done();
  });
});
test("has sync methods", () => {
  assert.equal(typeof gfs.readFileSync, "function");
});
