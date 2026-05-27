/**
 * Drop-in replacement for safer-buffer.
 * Re-exports the buffer module but removes unsafe methods.
 */
// @ts-nocheck

const buffer = require("node:buffer");

const SaferBuffer = Object.create(null);
Object.assign(SaferBuffer, buffer);

// Create a Buffer proxy that disables unsafe constructors/methods
SaferBuffer.Buffer = Object.assign(() => {
  throw new Error("SaferBuffer.Buffer is not a constructor");
}, Buffer);

// Remove unsafe methods
SaferBuffer.Buffer.allocUnsafe = undefined;
SaferBuffer.Buffer.allocUnsafeSlow = undefined;

module.exports = SaferBuffer;
