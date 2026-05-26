/**
 * @flupkejs/ms — Drop-in replacement for ms — time string parsing/formatting
 * @see https://www.npmjs.com/package/ms
 */
// Time unit constants in milliseconds
const S = 1000;
const M = S * 60;
const H = M * 60;
const D = H * 24;
const W = D * 7;
const Y = D * 365.25;

// Regex matching time strings like "2 days", "1h", "500ms"
// Safe: input length capped at 100 chars to prevent ReDoS
const PARSE_RE =
  /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i;

/** @param {string|number} val @param {{ long?: boolean }} [options] @returns {string|number|undefined} */
// Public API
module.exports = function ms(val, options) {
  const type = typeof val;
  if (type === "string" && val.length > 0) return parse(val);
  if (type === "number" && Number.isFinite(val))
    return options?.long ? fmtLong(val) : fmtShort(val);
  throw new Error(
    `val is not a non-empty string or a valid number: ${JSON.stringify(val)}`,
  );
};

/** @param {string} str */
// Parse a time string to milliseconds
function parse(str) {
  const s = str.trim();
  if (s.length > 100) return undefined;
  const match = PARSE_RE.exec(s);
  if (!match) return undefined;
  const n = Number.parseFloat(match[1]);
  const unit = (match[2] || "ms").toLowerCase();
  if (unit === "ms" || unit.startsWith("millisecond")) return n;
  if (unit === "s" || unit.startsWith("sec")) return n * S;
  if (unit === "m" || unit.startsWith("min")) return n * M;
  if (unit === "h" || unit.startsWith("hr") || unit.startsWith("hour"))
    return n * H;
  if (unit === "d" || unit.startsWith("day")) return n * D;
  if (unit === "w" || unit.startsWith("week")) return n * W;
  if (unit === "y" || unit.startsWith("year")) return n * Y;
  return undefined;
}

/** @param {number} ms */
// Format milliseconds to short string (1d, 2h, 3m)
function fmtShort(ms) {
  const abs = Math.abs(ms);
  if (abs >= D) return `${Math.round(ms / D)}d`;
  if (abs >= H) return `${Math.round(ms / H)}h`;
  if (abs >= M) return `${Math.round(ms / M)}m`;
  if (abs >= S) return `${Math.round(ms / S)}s`;
  return `${ms}ms`;
}

/** @param {number} ms */
// Format milliseconds to long string (1 day, 2 hours)
function fmtLong(ms) {
  const abs = Math.abs(ms);
  if (abs >= D) return plural(ms, abs, D, "day");
  if (abs >= H) return plural(ms, abs, H, "hour");
  if (abs >= M) return plural(ms, abs, M, "minute");
  if (abs >= S) return plural(ms, abs, S, "second");
  return `${ms} ms`;
}

function plural(ms, abs, unit, name) {
  const isPlural = abs >= unit * 1.5;
  return `${Math.round(ms / unit)} ${name}${isPlural ? "s" : ""}`;
}
