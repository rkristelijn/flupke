// @ts-nocheck
// Implementation: native-first, zero dependencies
// Public API
module.exports = function stableStringify(obj, opts) {
  const space = opts?.space;
  const cmp = opts?.cmp;
  const cycles = opts?.cycles;
  const seen = [];
  return (function stringify(node) {
    if (node === null || node === undefined) return "null";
    if (typeof node === "boolean" || typeof node === "number")
      return JSON.stringify(node);
    if (typeof node === "string") return JSON.stringify(node);
    if (Array.isArray(node)) {
      const arrOut = [];
      for (const item of node) arrOut.push(stringify(item) || "null");
      return `[${arrOut.join(",")}]`;
    }
    if (typeof node.toJSON === "function") return stringify(node.toJSON());
    if (seen.indexOf(node) !== -1) {
      if (cycles) return JSON.stringify("__cycle__");
      throw new TypeError("Converting circular structure to JSON");
    }
    seen.push(node);
    const keys = Object.keys(node).sort(cmp);
    const out = [];
    for (const key of keys) {
      if (node[key] === undefined) continue;
      const val = stringify(node[key]);
      if (val) out.push(`${JSON.stringify(key)}:${val}`);
    }
    seen.pop();
    return `{${out.join(",")}}`;
  })(obj);
};
