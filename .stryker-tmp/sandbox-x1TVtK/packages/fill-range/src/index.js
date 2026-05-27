// @ts-nocheck
function fillRange(start, end, step, options) {
  let opts = options;
  let inc = step;
  if (typeof step === "object") {
    opts = step;
    inc = undefined;
  }
  opts = opts || {};
  const transform = opts.transform || ((v) => v);

  if (
    typeof start === "string" &&
    start.length === 1 &&
    typeof end === "string" &&
    end.length === 1
  ) {
    return fillChars(start, end, inc, transform);
  }

  const a = Number(start);
  const b = Number(end);
  if (Number.isNaN(a) || Number.isNaN(b))
    throw new TypeError("fill-range: invalid range");

  const stepVal = Math.abs(Number(inc) || 1);
  const pad = opts.pad || (typeof start === "string" && /^0\d/.test(start));
  const width = pad ? Math.max(String(start).length, String(end).length) : 0;
  const results = [];

  if (a <= b) {
    for (let i = a; i <= b; i += stepVal)
      results.push(transform(padNum(i, width)));
  } else {
    for (let i = a; i >= b; i -= stepVal)
      results.push(transform(padNum(i, width)));
  }
  return results;
}

function fillChars(start, end, step, transform) {
  const a = start.charCodeAt(0);
  const b = end.charCodeAt(0);
  const inc = Math.abs(Number(step) || 1);
  const results = [];
  if (a <= b) {
    for (let i = a; i <= b; i += inc)
      results.push(transform(String.fromCharCode(i)));
  } else {
    for (let i = a; i >= b; i -= inc)
      results.push(transform(String.fromCharCode(i)));
  }
  return results;
}

function padNum(n, width) {
  if (!width) return String(n);
  const s = String(Math.abs(n));
  const padded = s.padStart(width, "0");
  return n < 0 ? `-${padded}` : padded;
}

module.exports = fillRange;
