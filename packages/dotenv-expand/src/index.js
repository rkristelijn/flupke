function expand(config) {
  const env = config.parsed || {};
  const processEnv = config.processEnv || process.env;
  for (const key of Object.keys(env)) {
    env[key] = interpolate(env[key], env, processEnv);
  }
  // Also set in process.env unless ignoreProcessEnv
  if (!config.ignoreProcessEnv) {
    for (const key of Object.keys(env)) {
      processEnv[key] = env[key];
    }
  }
  return config;
}

function interpolate(value, env, processEnv) {
  // Match ${VAR} and $VAR patterns
  return value.replace(
    /\$\{([^}]+)\}|\$([A-Z_][A-Z0-9_]*)/gi,
    (_, braced, bare) => {
      let key = braced || bare;
      // Default value support: ${VAR:-default}
      let defaultVal = "";
      if (key.includes(":-")) {
        const parts = key.split(":-");
        key = parts[0];
        defaultVal = parts[1];
      }
      return env[key] || processEnv[key] || defaultVal;
    },
  );
}

module.exports = { expand };
module.exports.expand = expand;
