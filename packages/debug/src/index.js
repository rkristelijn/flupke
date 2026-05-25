/**
 * @flupkejs/debug — debug
 * @see https://www.npmjs.com/package/debug
 */
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
    // Convert glob pattern to regex safely (escape special chars, then convert *)
    const escaped = p.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
    return new RegExp(`^${escaped}$`).test(ns);
  });
};
module.exports = debug;
