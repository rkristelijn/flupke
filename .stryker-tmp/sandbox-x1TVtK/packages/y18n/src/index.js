/**
 * @flupkejs/y18n — y18n
 * @see https://www.npmjs.com/package/y18n
 */
// @ts-nocheck

module.exports = function y18n(opts = {}) {
  const locale = opts.locale || "en";
  const cache = {};
  return {
    locale,
    __(str, ...args) {
      let result = cache[locale]?.[str] || str;
      for (const a of args) {
        result = result.replace(/%[sd]/, a);
      }
      return result;
    },
    setLocale(l) {
      this.locale = l;
    },
    updateLocale(obj) {
      cache[this.locale] = { ...cache[this.locale], ...obj };
    },
  };
};
