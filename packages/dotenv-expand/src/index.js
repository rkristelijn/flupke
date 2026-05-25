/**
 * @flupkejs/dotenv-expand — expand ${VAR} references in dotenv parsed output
 * @see https://www.npmjs.com/package/dotenv-expand
 */
'use strict';

function expand(config) {
  var env = config.parsed || {};
  var processEnv = config.processEnv || process.env;
  for (var key of Object.keys(env)) {
    env[key] = interpolate(env[key], env, processEnv);
  }
  // Also set in process.env unless ignoreProcessEnv
  if (!config.ignoreProcessEnv) {
    for (var key of Object.keys(env)) {
      processEnv[key] = env[key];
    }
  }
  return config;
}

function interpolate(value, env, processEnv) {
  // Match ${VAR} and $VAR patterns
  return value.replace(/\$\{([^}]+)\}|\$([A-Z_][A-Z0-9_]*)/gi, function(_, braced, bare) {
    var key = braced || bare;
    // Default value support: ${VAR:-default}
    var defaultVal = '';
    if (key.includes(':-')) {
      var parts = key.split(':-');
      key = parts[0];
      defaultVal = parts[1];
    }
    return env[key] || processEnv[key] || defaultVal;
  });
}

module.exports = { expand };
module.exports.expand = expand;
