/**
 * Parse Range header into an array of ranges.
 * @param {number} size - Total size of the resource
 * @param {string} rangeHeader - Range header value
 * @param {{combine?: boolean}} [options] - Options
 * @returns {Array|{start: number, end: number}|number} Ranges or error code
 */
// @ts-nocheck

function rangeParser(size, rangeHeader, options) {
  if (typeof rangeHeader !== "string") {
    return -1;
  }

  const parts = rangeHeader.trim().split("=");
  if (parts.length !== 2 || parts[0] !== "bytes") {
    return -1;
  }

  const ranges = parts[1].split(",").map((r) => {
    const range = r.trim();
    const dashIndex = range.indexOf("-");
    if (dashIndex === -1) {
      return -1;
    }
    const start = range.substring(0, dashIndex);
    const end = range.substring(dashIndex + 1);

    if (start === "" && end === "") {
      return -1;
    }

    // Suffix range: -500 means last 500 bytes
    if (start === "") {
      const len = Number.parseInt(end, 10);
      if (Number.isNaN(len) || len <= 0) {
        return -2;
      }
      const s = size - len;
      return { start: s < 0 ? 0 : s, end: size };
    }

    // Prefix range: 500- means from byte 500 to end
    if (end === "") {
      const s = Number.parseInt(start, 10);
      if (Number.isNaN(s) || s >= size) {
        return -2;
      }
      return { start: s, end: size };
    }

    // Normal range: 0-499
    const s = Number.parseInt(start, 10);
    const e = Number.parseInt(end, 10);
    if (Number.isNaN(s) || Number.isNaN(e) || s > e) {
      return -1;
    }
    if (s >= size) {
      return -2;
    }
    return { start: s, end: e + 1 };
  });

  // Check for errors
  for (const r of ranges) {
    if (typeof r === "number") {
      return r;
    }
  }

  // Combine overlapping ranges if option is set
  if (options?.combine) {
    ranges.sort((a, b) => a.start - b.start);
    const combined = [];
    for (const r of ranges) {
      if (
        combined.length === 0 ||
        r.start > combined[combined.length - 1].end
      ) {
        combined.push(r);
      } else {
        combined[combined.length - 1].end = Math.max(
          combined[combined.length - 1].end,
          r.end,
        );
      }
    }
    return combined;
  }

  return ranges;
}

module.exports = rangeParser;
