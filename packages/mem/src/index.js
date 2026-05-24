module.exports = function mem(fn, opts = {}) {
  const cache = new Map();
  const keyer = opts.cacheKey || ((...a) => a[0]);
  return function (...args) { const k = keyer(...args); if (cache.has(k)) return cache.get(k); const r = fn.apply(this, args); cache.set(k, r); return r; };
};
