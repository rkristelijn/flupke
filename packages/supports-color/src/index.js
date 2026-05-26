function createSupportsColor(stream) {
  if (process.env.NO_COLOR != null)
    return { level: 0, hasBasic: false, has256: false, has16m: false };
  if (process.env.FORCE_COLOR != null) {
    const force = process.env.FORCE_COLOR;
    const level = force === "0" ? 0 : force === "1" ? 1 : force === "2" ? 2 : 3;
    return {
      level,
      hasBasic: level >= 1,
      has256: level >= 2,
      has16m: level >= 3,
    };
  }
  if (!stream || !stream.isTTY)
    return { level: 0, hasBasic: false, has256: false, has16m: false };
  if (process.env.TERM === "dumb")
    return { level: 0, hasBasic: false, has256: false, has16m: false };
  if (stream.getColorDepth) {
    const depth = stream.getColorDepth();
    const level = depth >= 24 ? 3 : depth >= 8 ? 2 : depth >= 4 ? 1 : 0;
    return {
      level,
      hasBasic: level >= 1,
      has256: level >= 2,
      has16m: level >= 3,
    };
  }
  return { level: 1, hasBasic: true, has256: false, has16m: false };
}

const stdout = createSupportsColor(process.stdout);
const stderr = createSupportsColor(process.stderr);

module.exports = { stdout, stderr, ...stdout };
