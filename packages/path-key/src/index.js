module.exports = function pathKey(opts) {
  const env = opts?.env || process.env;
  const platform = opts?.platform || process.platform;
  if (platform !== "win32") return "PATH";
  return (
    Object.keys(env)
      .reverse()
      .find((k) => k.toUpperCase() === "PATH") || "Path"
  );
};
