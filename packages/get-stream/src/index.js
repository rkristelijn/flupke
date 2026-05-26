module.exports = async function getStream(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.isBuffer(chunks[0])
    ? Buffer.concat(chunks).toString()
    : chunks.join("");
};
module.exports.buffer = async function getStreamBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream)
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
};
