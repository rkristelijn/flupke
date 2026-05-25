/**
 * @flupkejs/dotenv-expand — dotenv-expand
 * @see https://www.npmjs.com/package/dotenv-expand
 */
module.exports = function expand(config) {
  const env = config.parsed || {};
  for (const key of Object.keys(env)) {
    env[key] = env[key].replace(/\$\{([^}]+)\}/g, (_, k) => env[k] || process.env[k] || '');
    env[key] = env[key].replace(/\$([A-Z_][A-Z0-9_]*)/gi, (_, k) => env[k] || process.env[k] || '');
  }
  return config;
};
