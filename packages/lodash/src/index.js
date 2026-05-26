// @flupkejs/lodash — native implementations of the top-50 lodash functions

// ═══ Arrays ═══
// Native implementations using Set, flat(), slice, spread
// Split array into groups of size n
exports.chunk = (arr, size) => {
  const r = [];
  for (let i = 0; i < arr.length; i += size) r.push(arr.slice(i, i + size));
  return r;
};
exports.compact = (arr) => arr.filter(Boolean);
// Flatten one level using native flat()
exports.flatten = (arr) => arr.flat();
exports.flattenDeep = (arr) => arr.flat(Infinity);
// Remove duplicates using Set
exports.uniq = (arr) => [...new Set(arr)];
exports.uniqBy = (arr, fn) => {
  const seen = new Set();
  const f = typeof fn === "string" ? (o) => o[fn] : fn;
  return arr.filter((x) => {
    const k = f(x);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};
// Return elements in a not in b
exports.difference = (a, b) => {
  const s = new Set(b);
  return a.filter((x) => !s.has(x));
};
// Return elements present in both arrays
exports.intersection = (a, b) => {
  const s = new Set(b);
  return a.filter((x) => s.has(x));
};
exports.zip = () => {
  const args = Array.from(arguments);
  const len = Math.max.apply(
    null,
    args.map((a) => a.length),
  );
  const r = [];
  for (let i = 0; i < len; i++) r.push(args.map((a) => a[i]));
  return r;
};
exports.take = (arr, n) => arr.slice(0, n === undefined ? 1 : n);
exports.drop = (arr, n) => arr.slice(n === undefined ? 1 : n);
exports.last = (arr) => arr[arr.length - 1];
exports.first = exports.head = (arr) => arr[0];
// Sort array by iteratee (string key or function)
exports.sortBy = (arr, fn) => {
  const f = typeof fn === "string" ? (o) => o[fn] : fn;
  return arr.slice().sort((a, b) => {
    const va = f(a);
    const vb = f(b);
    return va < vb ? -1 : va > vb ? 1 : 0;
  });
};
// Group array elements by key function
exports.groupBy = (arr, fn) => {
  const f = typeof fn === "string" ? (o) => o[fn] : fn;
  const r = {};
  arr.forEach((x) => {
    const k = f(x);
    (r[k] = r[k] || []).push(x);
  });
  return r;
};
// Index array elements by key function
exports.keyBy = (arr, fn) => {
  const f = typeof fn === "string" ? (o) => o[fn] : fn;
  const r = {};
  arr.forEach((x) => {
    r[f(x)] = x;
  });
  return r;
};
// Find first element matching predicate or partial object
exports.find = (arr, fn) =>
  arr.find(
    typeof fn === "function"
      ? fn
      : (o) => {
          for (const k in fn) if (o[k] !== fn[k]) return false;
          return true;
        },
  );
exports.findIndex = (arr, fn) =>
  arr.findIndex(
    typeof fn === "function"
      ? fn
      : (o) => {
          for (const k in fn) if (o[k] !== fn[k]) return false;
          return true;
        },
  );
// Generate array of numbers from start to end
exports.range = (start, end, step) => {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  step = step || (start < end ? 1 : -1);
  const r = [];
  if (step > 0) for (let i = start; i < end; i += step) r.push(i);
  else for (let i = start; i > end; i += step) r.push(i);
  return r;
};

// ═══ Objects ═══
// Native implementations using optional chaining, structuredClone, Object methods
// Safely access nested property by dot-path or array
exports.get = (obj, path, def) => {
  const keys = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)]/g, ".$1")
        .split(".");
  let r = obj;
  for (let i = 0; i < keys.length; i++) {
    if (r == null) return def;
    r = r[keys[i]];
  }
  return r === undefined ? def : r;
};
// Set a nested property by dot-path, creating intermediates
exports.set = (obj, path, val) => {
  const keys = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)]/g, ".$1")
        .split(".");
  let o = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (o[keys[i]] == null) o[keys[i]] = /^\d+$/.test(keys[i + 1]) ? [] : {};
    o = o[keys[i]];
  }
  o[keys[keys.length - 1]] = val;
  return obj;
};
// Create object with only specified keys
exports.pick = (obj, keys) => {
  const r = {};
  keys.forEach((k) => {
    if (k in obj) r[k] = obj[k];
  });
  return r;
};
// Create object without specified keys
exports.omit = (obj, keys) => {
  const s = new Set(keys);
  const r = {};
  for (const k in obj) if (!s.has(k)) r[k] = obj[k];
  return r;
};
// Deep merge objects (mutates target)
exports.merge = (target, ...sources) => {
  for (const src of sources) {
    for (const k in src) {
      if (src[k] && typeof src[k] === "object" && !Array.isArray(src[k])) {
        target[k] = exports.merge(target[k] || {}, src[k]);
      } else {
        target[k] = src[k];
      }
    }
  }
  return target;
};
// Deep clone using native structuredClone
exports.cloneDeep = (obj) => structuredClone(obj);
// Recursive deep equality check
exports.isEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== "object") return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (let i = 0; i < ka.length; i++) {
    if (!exports.isEqual(a[ka[i]], b[ka[i]])) return false;
  }
  return true;
};
// Check if value is empty (null, empty string, empty array/object)
exports.isEmpty = (val) => {
  if (val == null) return true;
  if (Array.isArray(val) || typeof val === "string") return val.length === 0;
  return Object.keys(val).length === 0;
};
exports.has = (obj, path) => exports.get(obj, path) !== undefined;
exports.keys = Object.keys;
exports.values = Object.values;
exports.entries = Object.entries;
exports.assign = Object.assign;
// Map over object values
exports.mapValues = (obj, fn) => {
  const r = {};
  for (const k in obj) r[k] = fn(obj[k], k);
  return r;
};
exports.mapKeys = (obj, fn) => {
  const r = {};
  for (const k in obj) r[fn(obj[k], k)] = obj[k];
  return r;
};
// Swap keys and values
exports.invert = (obj) => {
  const r = {};
  for (const k in obj) r[obj[k]] = k;
  return r;
};

// ═══ Functions ═══
// Utility wrappers: debounce, throttle, memoize, once
// Delay function execution until after wait ms of inactivity
exports.debounce = (fn, ms, opts) => {
  let t;
  let r;
  return function () {
    const args = arguments;
    if (opts?.leading && !t) {
      r = fn.apply(this, args);
    }
    clearTimeout(t);
    t = setTimeout(() => {
      t = null;
      if (!opts || !opts.leading) r = fn.apply(this, args);
    }, ms);
    return r;
  };
};
// Limit function execution to once per wait ms
exports.throttle = (fn, ms) => {
  let last = 0;
  return function () {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      return fn.apply(this, arguments);
    }
  };
};
// Ensure function is called at most once
exports.once = (fn) => {
  let called = false;
  let r;
  return function () {
    if (!called) {
      called = true;
      r = fn.apply(this, arguments);
    }
    return r;
  };
};
// Cache function results by first argument (or custom resolver)
exports.memoize = (fn, resolver) => {
  const cache = new Map();
  const memoized = function () {
    const key = resolver ? resolver.apply(this, arguments) : arguments[0];
    if (cache.has(key)) return cache.get(key);
    const r = fn.apply(this, arguments);
    cache.set(key, r);
    return r;
  };
  memoized.cache = cache;
  return memoized;
};
exports.noop = () => {};
exports.identity = (v) => v;

// ═══ Strings ═══
// Case conversion and string manipulation using native regex
// Convert string to camelCase
exports.camelCase = (s) =>
  s
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^./, (c) => c.toLowerCase());
// Convert string to kebab-case
exports.kebabCase = (s) =>
  s
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
exports.snakeCase = (s) =>
  s
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();
exports.capitalize = (s) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
exports.upperFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);
exports.trim = (s, chars) => {
  if (!chars) return s.trim();
  let start = 0;
  let end = s.length;
  while (start < end && chars.includes(s[start])) start++;
  while (end > start && chars.includes(s[end - 1])) end--;
  return s.slice(start, end);
};
exports.startsWith = (s, target) => s.startsWith(target);
exports.endsWith = (s, target) => s.endsWith(target);
exports.repeat = (s, n) => s.repeat(n);
exports.pad = (s, len, ch) => {
  ch = ch || " ";
  return s.padStart((len + s.length) / 2, ch).padEnd(len, ch);
};
exports.template = (str) => (data) =>
  str.replace(/\$\{([^}]+)}/g, (_, k) => data[k.trim()]);

// ═══ Type checks ═══
// Simple typeof guards — no runtime overhead
exports.isArray = Array.isArray;
exports.isObject = (v) => v !== null && typeof v === "object";
exports.isFunction = (v) => typeof v === "function";
exports.isString = (v) => typeof v === "string";
exports.isNumber = (v) => typeof v === "number" && !Number.isNaN(v);
exports.isBoolean = (v) => typeof v === "boolean";
exports.isNil = (v) => v == null;
exports.isNull = (v) => v === null;
exports.isUndefined = (v) => v === undefined;
exports.isPlainObject = (v) =>
  v !== null &&
  typeof v === "object" &&
  Object.getPrototypeOf(v) === Object.prototype;
exports.toNumber = Number;
exports.toString = String;

// --- default export (lodash style: _(...))
const _ = (v) => v;
Object.assign(_, exports);
_.default = _;
module.exports = _;
