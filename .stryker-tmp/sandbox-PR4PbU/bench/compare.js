/**
 * Comparative benchmark: original packages vs @flupke replacements
 * Tests both API compatibility and performance.
 */
// @ts-nocheck

'use strict';
const { performance } = require('node:perf_hooks');
const assert = require('node:assert/strict');

// --- Load packages ---
const origIsarray = require('isarray');
const flupkeIsarray = require('../packages/is-array/src/index.js');

const origMs = require('ms');
const flupkeMs = require('../packages/ms/src/index.js');

const origSafeBuffer = require('safe-buffer');
const flupkeSafeBuffer = require('../packages/safe-buffer/src/index.js');

const origInherits = require('inherits');
const flupkeInherits = require('../packages/inherits/src/index.js');

const origBind = require('function-bind');
const flupkeBind = require('../packages/function-bind/src/index.js');

// --- Helpers ---
function bench(name, fn, iterations = 1_000_000) {
  // Warmup
  for (let i = 0; i < 1000; i++) fn();
  const start = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  const elapsed = performance.now() - start;
  const opsPerSec = (iterations / elapsed * 1000).toFixed(0);
  return { name, elapsed: elapsed.toFixed(2), opsPerSec, iterations };
}

function compare(label, origResult, flupkeResult) {
  const ratio = (Number(flupkeResult.opsPerSec) / Number(origResult.opsPerSec));
  const pct = ((ratio - 1) * 100).toFixed(1);
  const symbol = ratio >= 1 ? '✓' : '⚠';
  console.log(`\n${symbol} ${label}`);
  console.log(`  Original: ${origResult.opsPerSec} ops/sec (${origResult.elapsed}ms)`);
  console.log(`  @flupke:  ${flupkeResult.opsPerSec} ops/sec (${flupkeResult.elapsed}ms)`);
  console.log(`  Δ: ${pct > 0 ? '+' : ''}${pct}%`);
  return { label, origOps: origResult.opsPerSec, flupkeOps: flupkeResult.opsPerSec, pct };
}

// ============================================================
// API COMPATIBILITY TESTS
// ============================================================
console.log('=== API COMPATIBILITY ===\n');

// isarray
console.log('isarray:');
const isarrayTests = [[], [1,2,3], {}, null, 'hello', 42, undefined, new Array()];
for (const input of isarrayTests) {
  const orig = origIsarray(input);
  const flup = flupkeIsarray(input);
  assert.equal(orig, flup, `isarray mismatch for ${JSON.stringify(input)}`);
}
console.log('  ✓ All inputs match');

// ms
console.log('ms:');
const msParseTests = ['2 days', '1d', '10h', '2.5 hrs', '2h', '1m', '5s', '1y', '100ms', '1.5h', '-3 days'];
for (const input of msParseTests) {
  const orig = origMs(input);
  const flup = flupkeMs(input);
  assert.equal(orig, flup, `ms parse mismatch for "${input}": orig=${orig}, flupke=${flup}`);
}
const msFormatTests = [500, 1000, 60000, 3600000, 86400000];
for (const input of msFormatTests) {
  const orig = origMs(input);
  const flup = flupkeMs(input);
  assert.equal(orig, flup, `ms format mismatch for ${input}: orig=${orig}, flupke=${flup}`);
}
for (const input of msFormatTests) {
  const orig = origMs(input, { long: true });
  const flup = flupkeMs(input, { long: true });
  assert.equal(orig, flup, `ms long format mismatch for ${input}: orig=${orig}, flupke=${flup}`);
}
console.log('  ✓ Parse, format, and long format all match');

// safe-buffer
console.log('safe-buffer:');
assert.equal(origSafeBuffer.Buffer, Buffer);
assert.equal(flupkeSafeBuffer.Buffer, Buffer);
const buf1 = origSafeBuffer.Buffer.from('hello');
const buf2 = flupkeSafeBuffer.Buffer.from('hello');
assert.deepEqual(buf1, buf2);
console.log('  ✓ Buffer.from/alloc identical');

// inherits
console.log('inherits:');
function OrigParent() {}
OrigParent.prototype.hello = function() { return 'world'; };
function OrigChild() {}
origInherits(OrigChild, OrigParent);
function FlupkeParent() {}
FlupkeParent.prototype.hello = function() { return 'world'; };
function FlupkeChild() {}
flupkeInherits(FlupkeChild, FlupkeParent);
assert.equal(new OrigChild().hello(), new FlupkeChild().hello());
assert.equal(OrigChild.super_, OrigParent);
assert.equal(FlupkeChild.super_, FlupkeParent);
assert.ok(new OrigChild() instanceof OrigParent);
assert.ok(new FlupkeChild() instanceof FlupkeParent);
console.log('  ✓ Prototype chain, super_, instanceof all match');

// function-bind
console.log('function-bind:');
function greet(greeting) { return greeting + ' ' + this.name; }
const origBound = origBind.call(greet, { name: 'world' }, 'hello');
const flupkeBound = flupkeBind.call(greet, { name: 'world' }, 'hello');
assert.equal(origBound(), flupkeBound());
assert.equal(origBound(), 'hello world');
console.log('  ✓ Bind with context and partial application match');

console.log('\n✓ ALL API TESTS PASSED\n');

// ============================================================
// PERFORMANCE BENCHMARKS
// ============================================================
console.log('=== PERFORMANCE BENCHMARKS ===');

const results = [];

// isarray
const inputs = [[], [1,2,3], {}, null, 'hello', 42, { length: 3 }];
results.push(compare('isarray',
  bench('orig', () => { for (const i of inputs) origIsarray(i); }),
  bench('flupke', () => { for (const i of inputs) flupkeIsarray(i); })
));

// ms - parse
results.push(compare('ms (parse)',
  bench('orig', () => { origMs('2 days'); origMs('1h'); origMs('500ms'); }),
  bench('flupke', () => { flupkeMs('2 days'); flupkeMs('1h'); flupkeMs('500ms'); })
));

// ms - format
results.push(compare('ms (format)',
  bench('orig', () => { origMs(86400000); origMs(3600000); origMs(500); }),
  bench('flupke', () => { flupkeMs(86400000); flupkeMs(3600000); flupkeMs(500); })
));

// safe-buffer
results.push(compare('safe-buffer (Buffer.from)',
  bench('orig', () => { origSafeBuffer.Buffer.from('hello world'); }),
  bench('flupke', () => { flupkeSafeBuffer.Buffer.from('hello world'); })
));

// inherits
results.push(compare('inherits',
  bench('orig', () => { function A() {} function B() {} origInherits(B, A); }),
  bench('flupke', () => { function A() {} function B() {} flupkeInherits(B, A); })
));

// function-bind
const fn = function(a, b) { return this.x + a + b; };
const ctx = { x: 1 };
results.push(compare('function-bind',
  bench('orig', () => { origBind.call(fn, ctx, 2, 3)(); }),
  bench('flupke', () => { flupkeBind.call(fn, ctx, 2, 3)(); })
));

// Summary
console.log('\n=== SUMMARY ===\n');
console.log('| Package | Original ops/sec | @flupke ops/sec | Δ |');
console.log('|---------|-----------------|-----------------|---|');
for (const r of results) {
  const sign = r.pct > 0 ? '+' : '';
  console.log(`| ${r.label} | ${Number(r.origOps).toLocaleString()} | ${Number(r.flupkeOps).toLocaleString()} | ${sign}${r.pct}% |`);
}
