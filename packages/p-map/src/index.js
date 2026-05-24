module.exports = async function pMap(iterable, mapper, opts = {}) {
  const { concurrency = Infinity } = opts;
  const items = [...iterable];
  const results = new Array(items.length);
  let i = 0;
  async function worker() { while (i < items.length) { const idx = i++; results[idx] = await mapper(items[idx], idx); } }
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
};
