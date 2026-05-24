const map = new Map();
module.exports = function inflight(key, cb) {
  if (map.has(key)) { map.get(key).push(cb); return null; }
  const cbs = [cb]; map.set(key, cbs);
  return function (...args) { map.delete(key); cbs.forEach(fn => fn(...args)); };
};
