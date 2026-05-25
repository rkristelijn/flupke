/**
 * @flupkejs/lodash — Drop-in replacement for lodash — native ES2020+ implementations
 * @see https://www.npmjs.com/package/lodash
 */
'use strict';
// @flupkejs/lodash — native implementations of the top-50 lodash functions

// ═══ Arrays ═══
// Native implementations using Set, flat(), slice, spread
// Split array into groups of size n
exports.chunk = function(arr, size) { var r = []; for (var i = 0; i < arr.length; i += size) r.push(arr.slice(i, i + size)); return r; };
exports.compact = function(arr) { return arr.filter(Boolean); };
// Flatten one level using native flat()
exports.flatten = function(arr) { return arr.flat(); };
exports.flattenDeep = function(arr) { return arr.flat(Infinity); };
// Remove duplicates using Set
exports.uniq = function(arr) { return [...new Set(arr)]; };
exports.uniqBy = function(arr, fn) { var seen = new Set(), f = typeof fn === 'string' ? function(o){return o[fn]} : fn; return arr.filter(function(x) { var k = f(x); if (seen.has(k)) return false; seen.add(k); return true; }); };
// Return elements in a not in b
exports.difference = function(a, b) { var s = new Set(b); return a.filter(function(x) { return !s.has(x); }); };
// Return elements present in both arrays
exports.intersection = function(a, b) { var s = new Set(b); return a.filter(function(x) { return s.has(x); }); };
exports.zip = function() { var args = Array.from(arguments); var len = Math.max.apply(null, args.map(function(a){return a.length})); var r = []; for (var i = 0; i < len; i++) r.push(args.map(function(a){return a[i]})); return r; };
exports.take = function(arr, n) { return arr.slice(0, n === undefined ? 1 : n); };
exports.drop = function(arr, n) { return arr.slice(n === undefined ? 1 : n); };
exports.last = function(arr) { return arr[arr.length - 1]; };
exports.first = exports.head = function(arr) { return arr[0]; };
// Sort array by iteratee (string key or function)
exports.sortBy = function(arr, fn) { var f = typeof fn === 'string' ? function(o){return o[fn]} : fn; return arr.slice().sort(function(a,b) { var va = f(a), vb = f(b); return va < vb ? -1 : va > vb ? 1 : 0; }); };
// Group array elements by key function
exports.groupBy = function(arr, fn) { var f = typeof fn === 'string' ? function(o){return o[fn]} : fn; var r = {}; arr.forEach(function(x) { var k = f(x); (r[k] = r[k] || []).push(x); }); return r; };
// Index array elements by key function
exports.keyBy = function(arr, fn) { var f = typeof fn === 'string' ? function(o){return o[fn]} : fn; var r = {}; arr.forEach(function(x) { r[f(x)] = x; }); return r; };
// Find first element matching predicate or partial object
exports.find = function(arr, fn) { return arr.find(typeof fn === 'function' ? fn : function(o) { for (var k in fn) if (o[k] !== fn[k]) return false; return true; }); };
exports.findIndex = function(arr, fn) { return arr.findIndex(typeof fn === 'function' ? fn : function(o) { for (var k in fn) if (o[k] !== fn[k]) return false; return true; }); };
// Generate array of numbers from start to end
exports.range = function(start, end, step) { if (end === undefined) { end = start; start = 0; } step = step || (start < end ? 1 : -1); var r = []; if (step > 0) for (var i = start; i < end; i += step) r.push(i); else for (var i = start; i > end; i += step) r.push(i); return r; };

// ═══ Objects ═══
// Native implementations using optional chaining, structuredClone, Object methods
// Safely access nested property by dot-path or array
exports.get = function(obj, path, def) { var keys = Array.isArray(path) ? path : String(path).replace(/\[(\d+)]/g, '.$1').split('.'); var r = obj; for (var i = 0; i < keys.length; i++) { if (r == null) return def; r = r[keys[i]]; } return r === undefined ? def : r; };
// Set a nested property by dot-path, creating intermediates
exports.set = function(obj, path, val) { var keys = Array.isArray(path) ? path : String(path).replace(/\[(\d+)]/g, '.$1').split('.'); var o = obj; for (var i = 0; i < keys.length - 1; i++) { if (o[keys[i]] == null) o[keys[i]] = /^\d+$/.test(keys[i+1]) ? [] : {}; o = o[keys[i]]; } o[keys[keys.length-1]] = val; return obj; };
// Create object with only specified keys
exports.pick = function(obj, keys) { var r = {}; keys.forEach(function(k) { if (k in obj) r[k] = obj[k]; }); return r; };
// Create object without specified keys
exports.omit = function(obj, keys) { var s = new Set(keys); var r = {}; for (var k in obj) if (!s.has(k)) r[k] = obj[k]; return r; };
// Deep merge objects (mutates target)
exports.merge = function(target) { for (var i = 1; i < arguments.length; i++) { var src = arguments[i]; for (var k in src) { if (src[k] && typeof src[k] === 'object' && !Array.isArray(src[k])) { target[k] = exports.merge(target[k] || {}, src[k]); } else { target[k] = src[k]; } } } return target; };
// Deep clone using native structuredClone
exports.cloneDeep = function(obj) { return structuredClone(obj); };
// Recursive deep equality check
exports.isEqual = function(a, b) { if (a === b) return true; if (a == null || b == null) return false; if (typeof a !== 'object') return false; var ka = Object.keys(a), kb = Object.keys(b); if (ka.length !== kb.length) return false; for (var i = 0; i < ka.length; i++) { if (!exports.isEqual(a[ka[i]], b[ka[i]])) return false; } return true; };
// Check if value is empty (null, empty string, empty array/object)
exports.isEmpty = function(val) { if (val == null) return true; if (Array.isArray(val) || typeof val === 'string') return val.length === 0; return Object.keys(val).length === 0; };
exports.has = function(obj, path) { return exports.get(obj, path) !== undefined; };
exports.keys = Object.keys;
exports.values = Object.values;
exports.entries = Object.entries;
exports.assign = Object.assign;
// Map over object values
exports.mapValues = function(obj, fn) { var r = {}; for (var k in obj) r[k] = fn(obj[k], k); return r; };
exports.mapKeys = function(obj, fn) { var r = {}; for (var k in obj) r[fn(obj[k], k)] = obj[k]; return r; };
// Swap keys and values
exports.invert = function(obj) { var r = {}; for (var k in obj) r[obj[k]] = k; return r; };

// ═══ Functions ═══
// Utility wrappers: debounce, throttle, memoize, once
// Delay function execution until after wait ms of inactivity
exports.debounce = function(fn, ms, opts) { var t, r; return function() { var self = this, args = arguments; if (opts && opts.leading && !t) { r = fn.apply(self, args); } clearTimeout(t); t = setTimeout(function() { t = null; if (!opts || !opts.leading) r = fn.apply(self, args); }, ms); return r; }; };
// Limit function execution to once per wait ms
exports.throttle = function(fn, ms) { var last = 0; return function() { var now = Date.now(); if (now - last >= ms) { last = now; return fn.apply(this, arguments); } }; };
// Ensure function is called at most once
exports.once = function(fn) { var called = false, r; return function() { if (!called) { called = true; r = fn.apply(this, arguments); } return r; }; };
// Cache function results by first argument (or custom resolver)
exports.memoize = function(fn, resolver) { var cache = new Map(); var memoized = function() { var key = resolver ? resolver.apply(this, arguments) : arguments[0]; if (cache.has(key)) return cache.get(key); var r = fn.apply(this, arguments); cache.set(key, r); return r; }; memoized.cache = cache; return memoized; };
exports.noop = function() {};
exports.identity = function(v) { return v; };

// ═══ Strings ═══
// Case conversion and string manipulation using native regex
// Convert string to camelCase
exports.camelCase = function(s) { return s.replace(/[-_\s]+(.)?/g, function(_, c) { return c ? c.toUpperCase() : ''; }).replace(/^./, function(c) { return c.toLowerCase(); }); };
// Convert string to kebab-case
exports.kebabCase = function(s) { return s.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase(); };
exports.snakeCase = function(s) { return s.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s-]+/g, '_').toLowerCase(); };
exports.capitalize = function(s) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); };
exports.upperFirst = function(s) { return s.charAt(0).toUpperCase() + s.slice(1); };
exports.trim = function(s, chars) { return chars ? s.replace(new RegExp('^['+chars+']+|['+chars+']+$', 'g'), '') : s.trim(); };
exports.startsWith = function(s, target) { return s.startsWith(target); };
exports.endsWith = function(s, target) { return s.endsWith(target); };
exports.repeat = function(s, n) { return s.repeat(n); };
exports.pad = function(s, len, ch) { ch = ch || ' '; return s.padStart((len + s.length) / 2, ch).padEnd(len, ch); };
exports.template = function(str) { return function(data) { return str.replace(/\$\{([^}]+)}/g, function(_, k) { return data[k.trim()]; }); }; };

// ═══ Type checks ═══
// Simple typeof guards — no runtime overhead
exports.isArray = Array.isArray;
exports.isObject = function(v) { return v !== null && typeof v === 'object'; };
exports.isFunction = function(v) { return typeof v === 'function'; };
exports.isString = function(v) { return typeof v === 'string'; };
exports.isNumber = function(v) { return typeof v === 'number' && !isNaN(v); };
exports.isBoolean = function(v) { return typeof v === 'boolean'; };
exports.isNil = function(v) { return v == null; };
exports.isNull = function(v) { return v === null; };
exports.isUndefined = function(v) { return v === undefined; };
exports.isPlainObject = function(v) { return v !== null && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype; };
exports.toNumber = Number;
exports.toString = String;

// --- default export (lodash style: _(...))
var _ = function(v) { return v; };
Object.assign(_, exports);
_.default = _;
module.exports = _;
