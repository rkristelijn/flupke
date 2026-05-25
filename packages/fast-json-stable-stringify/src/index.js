/**
 * @flupkejs/fast-json-stable-stringify — Drop-in replacement for fast-json-stable-stringify
 * @see https://www.npmjs.com/package/fast-json-stable-stringify
 */
'use strict';
// Implementation: native-first, zero dependencies
// Public API
module.exports = function stableStringify(obj, opts) {
  var space = opts && opts.space;
  var cmp = opts && opts.cmp;
  var cycles = opts && opts.cycles;
  var seen = [];
  return (function stringify(node) {
    if (node === null || node === undefined) return 'null';
    if (typeof node === 'boolean' || typeof node === 'number') return JSON.stringify(node);
    if (typeof node === 'string') return JSON.stringify(node);
    if (Array.isArray(node)) {
      var arrOut = [];
      for (var i = 0; i < node.length; i++) arrOut.push(stringify(node[i]) || 'null');
      return '[' + arrOut.join(',') + ']';
    }
    if (typeof node.toJSON === 'function') return stringify(node.toJSON());
    if (seen.indexOf(node) !== -1) {
      if (cycles) return JSON.stringify('__cycle__');
      throw new TypeError('Converting circular structure to JSON');
    }
    seen.push(node);
    var keys = Object.keys(node).sort(cmp);
    var out = [];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (node[key] === undefined) continue;
      var val = stringify(node[key]);
      if (val) out.push(JSON.stringify(key) + ':' + val);
    }
    seen.pop();
    return '{' + out.join(',') + '}';
  })(obj);
};
