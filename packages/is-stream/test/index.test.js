const { test } = require("node:test");
const assert = require("node:assert/strict");
const { Readable, Writable } = require("node:stream");
const {
  isStream,
  isReadableStream,
  isWritableStream,
} = require("../src/index.js");
test("readable stream", () => {
  const r = new Readable({ read() {} });
  assert.equal(isStream(r), true);
  assert.equal(isReadableStream(r), true);
});
test("writable stream", () => {
  const w = new Writable({
    write(c, e, cb) {
      cb();
    },
  });
  assert.equal(isWritableStream(w), true);
});
test("not streams", () => {
  assert.equal(isStream(null), false);
  assert.equal(isStream({}), false);
  assert.equal(isStream("pipe"), false);
});
