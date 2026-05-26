const { it } = require("node:test");
const assert = require("node:assert/strict");
const { Readable } = require("node:stream");
const getStream = require("../src/index.js");
it("reads stream to string", async () => {
  const s = Readable.from(["hello", " ", "world"]);
  assert.strictEqual(await getStream(s), "hello world");
});
it("buffer mode", async () => {
  const s = Readable.from([Buffer.from("hi")]);
  const b = await getStream.buffer(s);
  assert.ok(Buffer.isBuffer(b));
  assert.strictEqual(b.toString(), "hi");
});
