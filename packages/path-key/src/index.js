module.exports = function pathKey(opts) {
  const env = (opts && opts.env) || process.env;
  const platform = (opts && opts.platform) || process.platform;
  if (platform !== 'win32') return 'PATH';
  return Object.keys(env).reverse().find(k => k.toUpperCase() === 'PATH') || 'Path';
};
