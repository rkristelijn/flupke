function parse(v) {
  const m = String(v).match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
  if (!m) return null;
  return {
    major: +m[1],
    minor: +m[2],
    patch: +m[3],
    prerelease: m[4] || "",
    version: v,
  };
}
function compare(a, b) {
  const pa = parse(a);
  const pb = parse(b);
  if (!pa || !pb) return Number.NaN;
  if (pa.major !== pb.major) return pa.major - pb.major;
  if (pa.minor !== pb.minor) return pa.minor - pb.minor;
  if (pa.patch !== pb.patch) return pa.patch - pb.patch;
  if (pa.prerelease && !pb.prerelease) return -1;
  if (!pa.prerelease && pb.prerelease) return 1;
  return 0;
}
function gt(a, b) {
  return compare(a, b) > 0;
}
function lt(a, b) {
  return compare(a, b) < 0;
}
function eq(a, b) {
  return compare(a, b) === 0;
}
function satisfies(v, r) {
  const p = parse(v);
  if (!p) return false;
  const m = r.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return false;
  const rm = { major: +m[1], minor: +m[2], patch: +m[3] };
  return p.major === rm.major && p.minor === rm.minor && p.patch === rm.patch;
}
module.exports = { parse, compare, gt, lt, eq, satisfies };
