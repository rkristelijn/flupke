const S = 1000;
const M = S * 60;
const H = M * 60;
const D = H * 24;
const W = D * 7;
const Y = D * 365.25;

const PARSE_RE = /^(-?\d*\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i;

/** @param {string|number} val @param {{ long?: boolean }} [options] @returns {string|number|undefined} */
module.exports = function ms(val, options) {
  if (typeof val === 'string' && val.length > 0) return parse(val);
  if (typeof val === 'number' && isFinite(val)) return format(val, options);
  throw new Error('val is not a non-empty string or a valid number: ' + JSON.stringify(val));
};

/** @param {string} str */
function parse(str) {
  const match = PARSE_RE.exec(str.trim());
  if (!match) return undefined;
  const n = parseFloat(match[1]);
  const unit = (match[2] || 'ms').toLowerCase();
  if (unit === 'ms' || unit.startsWith('millisecond')) return n;
  if (unit === 's' || unit.startsWith('sec')) return n * S;
  if (unit === 'm' || unit.startsWith('min')) return n * M;
  if (unit === 'h' || unit.startsWith('hr') || unit.startsWith('hour')) return n * H;
  if (unit === 'd' || unit.startsWith('day')) return n * D;
  if (unit === 'w' || unit.startsWith('week')) return n * W;
  if (unit === 'y' || unit.startsWith('year')) return n * Y;
  return undefined;
}

/** @param {number} ms @param {{ long?: boolean }} [options] */
function format(ms, options) {
  const abs = Math.abs(ms);
  if (options && options.long) {
    if (abs >= D) return plural(ms, abs, D, 'day');
    if (abs >= H) return plural(ms, abs, H, 'hour');
    if (abs >= M) return plural(ms, abs, M, 'minute');
    if (abs >= S) return plural(ms, abs, S, 'second');
    return ms + ' ms';
  }
  if (abs >= D) return Math.round(ms / D) + 'd';
  if (abs >= H) return Math.round(ms / H) + 'h';
  if (abs >= M) return Math.round(ms / M) + 'm';
  if (abs >= S) return Math.round(ms / S) + 's';
  return ms + 'ms';
}

function plural(ms, abs, unit, name) {
  const val = Math.round(abs / unit);
  return val + ' ' + name + (val > 1 ? 's' : '');
}
