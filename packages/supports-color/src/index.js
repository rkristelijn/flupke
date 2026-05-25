module.exports = function supportsColor() {
  if (process.env.NO_COLOR)
    return { hasBasic: false, has256: false, has16m: false };
  if (process.env.FORCE_COLOR)
    return { hasBasic: true, has256: true, has16m: true };
  if (!process.stdout.isTTY)
    return { hasBasic: false, has256: false, has16m: false };
  if (process.stdout.getColorDepth) {
    const depth = process.stdout.getColorDepth();
    return { hasBasic: depth >= 4, has256: depth >= 8, has16m: depth >= 24 };
  }
  return { hasBasic: true, has256: true, has16m: true };
};
