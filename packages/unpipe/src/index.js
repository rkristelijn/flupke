/**
 * Unpipe a stream from all destinations.
 * @param {object} stream
 */
function unpipe(stream) {
  if (!stream) {
    throw new TypeError('argument stream is required');
  }
  if (typeof stream.unpipe === 'function') {
    stream.unpipe();
  }
}

module.exports = unpipe;
