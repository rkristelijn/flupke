/**
 * @flupkejs/p-limit — p-limit
 * @see https://www.npmjs.com/package/p-limit
 */
module.exports = function pLimit(concurrency) {
  let active = 0;
  const queue = [];
  function next() {
    if (active < concurrency && queue.length) {
      active++;
      const { fn, resolve, reject } = queue.shift();
      fn().then(v => { active--; resolve(v); next(); }, e => { active--; reject(e); next(); });
    }
  }
  const limit = function (fn) {
    return new Promise((resolve, reject) => { queue.push({ fn, resolve, reject }); next(); });
  };
  limit.activeCount = () => active;
  limit.pendingCount = () => queue.length;
  return limit;
};
