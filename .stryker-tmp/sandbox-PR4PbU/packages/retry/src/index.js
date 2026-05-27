/**
 * @flupkejs/retry — retry
 * @see https://www.npmjs.com/package/retry
 */
// @ts-nocheck

module.exports = async function retry(fn, opts = {}) {
  const { retries = 3, delay = 100 } = opts;
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn(i);
    } catch (e) {
      lastErr = e;
      if (i < retries) await new Promise((r) => setTimeout(r, delay * (i + 1)));
    }
  }
  throw lastErr;
};
