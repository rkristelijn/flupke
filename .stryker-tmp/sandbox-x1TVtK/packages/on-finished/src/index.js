/**
 * Execute callback when HTTP response finishes.
 * @param {Object} msg - HTTP response object
 * @param {Function} listener - Callback function
 * @returns {Function} Abort function
 */
// @ts-nocheck

function onFinished(msg, listener) {
  if (typeof listener !== "function") {
    throw new TypeError("argument listener must be a function");
  }

  // Check if already finished
  if (isFinished(msg)) {
    const err = null;
    setImmediate(listener, err, msg);
    return () => {};
  }

  // Store listeners
  const listeners = msg._onFinished || (msg._onFinished = []);
  listeners.push(listener);

  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
  };
}

/**
 * Check if HTTP response has finished.
 * @param {Object} msg - HTTP response object
 * @returns {boolean} True if finished
 */
function isFinished(msg) {
  return msg.finished === true || msg.writableFinished === true;
}

// Helper to emit finished event
onFinished.emit = (msg) => {
  const listeners = msg._onFinished || [];
  msg._onFinished = undefined;

  for (const listener of listeners) {
    setImmediate(listener, null, msg);
  }
};

module.exports = onFinished;
module.exports.isFinished = isFinished;
