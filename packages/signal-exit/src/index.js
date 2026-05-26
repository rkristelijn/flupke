const listeners = new Map();
function onExit(handler) {
  const wrapped = (code, signal) => {
    listeners.delete(wrapped);
    handler(code, signal);
  };
  listeners.set(wrapped, handler);
  process.on("exit", wrapped);
  for (const sig of ["SIGINT", "SIGTERM"]) {
    process.on(sig, wrapped);
  }
  return () => {
    listeners.delete(wrapped);
  };
}
module.exports = onExit;
