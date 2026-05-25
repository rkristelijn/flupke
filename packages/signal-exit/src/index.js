/**
 * @flupkejs/signal-exit — Signal exit handler
 * @see https://www.npmjs.com/package/signal-exit
 */
'use strict';
const listeners = new Map();
function onExit(handler) {
  const wrapped = (code, signal) => {
    listeners.delete(wrapped);
    handler(code, signal);
  };
  listeners.set(wrapped, handler);
  process.on('exit', wrapped);
  ['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig, wrapped);
  });
  return function() {
    listeners.delete(wrapped);
  };
}
module.exports = onExit;