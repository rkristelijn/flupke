function destroy(stream) {
  if (stream && typeof stream.destroy === "function") stream.destroy();
  return stream;
}
module.exports = destroy;
