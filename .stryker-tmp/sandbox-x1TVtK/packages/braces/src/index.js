// @ts-nocheck
function braces(pattern, options) {
  const opts = options || {};
  if (opts.expand) return expand(pattern);
  return [compile(pattern)];
}

function expand(pattern) {
  const results = [""];
  const stack = [results];
  let i = 0;

  while (i < pattern.length) {
    if (pattern[i] === "{") {
      const range = tryRange(pattern, i);
      if (range) {
        const current = stack[stack.length - 1];
        const expanded = expandRange(range.body);
        const newResults = [];
        for (const prefix of current) {
          for (const item of expanded) newResults.push(prefix + item);
        }
        stack[stack.length - 1] = newResults;
        i = range.end + 1;
        continue;
      }
      const items = parseBraces(pattern, i);
      if (items) {
        const current = stack[stack.length - 1];
        const newResults = [];
        for (const prefix of current) {
          for (const item of items.parts) newResults.push(prefix + item);
        }
        stack[stack.length - 1] = newResults;
        i = items.end + 1;
        continue;
      }
    }
    const current = stack[stack.length - 1];
    for (let j = 0; j < current.length; j++) current[j] += pattern[i];
    i++;
  }

  return stack[stack.length - 1];
}

function tryRange(pattern, start) {
  let depth = 0;
  let i = start;
  for (; i < pattern.length; i++) {
    if (pattern[i] === "{") depth++;
    else if (pattern[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) return null;
  const body = pattern.slice(start + 1, i);
  if (/^-?\w+\.\.-?\w+(\.\.\d+)?$/.test(body)) return { body, end: i };
  return null;
}

function expandRange(body) {
  const parts = body.split("..");
  const start = parts[0];
  const end = parts[1];
  const step = parts[2] ? Number(parts[2]) : 1;
  if (/^\d+$/.test(start) || /^-\d+$/.test(start)) {
    const a = Number(start);
    const b = Number(end);
    const results = [];
    const pad = /^0\d/.test(start) ? Math.max(start.length, end.length) : 0;
    if (a <= b) {
      for (let i = a; i <= b; i += step) results.push(padN(i, pad));
    } else {
      for (let i = a; i >= b; i -= step) results.push(padN(i, pad));
    }
    return results;
  }
  const a = start.charCodeAt(0);
  const b = end.charCodeAt(0);
  const results = [];
  if (a <= b) {
    for (let i = a; i <= b; i += step) results.push(String.fromCharCode(i));
  } else {
    for (let i = a; i >= b; i -= step) results.push(String.fromCharCode(i));
  }
  return results;
}

function padN(n, width) {
  if (!width) return String(n);
  return String(n).padStart(width, "0");
}

function parseBraces(pattern, start) {
  let depth = 0;
  let i = start;
  for (; i < pattern.length; i++) {
    if (pattern[i] === "{") depth++;
    else if (pattern[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) return null;
  const body = pattern.slice(start + 1, i);
  if (!body.includes(",")) return null;
  return { parts: splitTop(body), end: i };
}

function splitTop(str) {
  const parts = [];
  let depth = 0;
  let current = "";
  for (const ch of str) {
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else current += ch;
  }
  parts.push(current);
  // Recursively expand nested braces
  const results = [];
  for (const part of parts) {
    if (part.includes("{")) results.push(...expand(part));
    else results.push(part);
  }
  return results;
}

function compile(pattern) {
  // Return regex-optimized form (non-expanded)
  return pattern
    .replace(/\{(-?\w+)\.\.(-?\w+)\}/g, (_, a, b) => `(${a}|${b})`)
    .replace(/\{([^}]+)\}/g, (_, body) => `(${body.split(",").join("|")})`);
}

braces.expand = expand;
module.exports = braces;
