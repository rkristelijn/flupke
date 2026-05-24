module.exports = function y18n(opts = {}) {
  const locale = opts.locale || 'en';
  const cache = {};
  return {
    locale,
    __(str, ...args) {
      let result = (cache[locale] && cache[locale][str]) || str;
      args.forEach((a, i) => { result = result.replace(/%[sd]/, a); });
      return result;
    },
    setLocale(l) { this.locale = l; },
    updateLocale(obj) { cache[this.locale] = { ...cache[this.locale], ...obj }; }
  };
};
