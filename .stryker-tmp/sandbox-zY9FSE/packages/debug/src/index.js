/**
 * @flupkejs/debug — debug
 * @see https://www.npmjs.com/package/debug
 */
// @ts-nocheck

function debug(namespace) {
  const fn = (...args) => {
    if (!debug.enabled(namespace)) return;
    const msg = typeof args[0] === "string" ? args.shift() : "";
    process.stderr.write(`${namespace} ${msg}\n`);
  };
  fn.namespace = namespace;
  fn.enabled = debug.enabled(namespace);
  return fn;
}
debug.enabled = (ns) => {
  const e = process.env.DEBUG || "";
  if (!e) return false;
  if (e === "*") return true;
  return e.split(",").some((p) => {
    p = p.trim();
    if (p === ns) return true;
    // Simple glob: only support trailing * (e.g. "app:*")
    if (p.endsWith("*") && ns.startsWith(p.slice(0, -1))) return true;
    // Support prefix* matching (e.g. "http*")
    const parts = p.split("*");
    if (parts.length === 2)
      return ns.startsWith(parts[0]) && ns.endsWith(parts[1]);
    return false;
  });
};
module.exports = debug;
