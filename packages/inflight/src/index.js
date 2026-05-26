/**
 * @flupkejs/inflight — inflight
 * @see https://www.npmjs.com/package/inflight
 */
const map = new Map();
module.exports = function inflight(key, cb) {
  if (map.has(key)) {
    map.get(key).push(cb);
    return null;
  }
  const cbs = [cb];
  map.set(key, cbs);
  return (...args) => {
    map.delete(key);
    for (const fn of cbs) fn(...args);
  };
};
