const { test } = require('node:test');
const assert = require('node:assert/strict');
const ms = require('../src/index.js');

test('parse: milliseconds', () => {
  assert.equal(ms('100ms'), 100);
  assert.equal(ms('50'), 50);
});

test('parse: seconds', () => {
  assert.equal(ms('1s'), 1000);
  assert.equal(ms('5s'), 5000);
  assert.equal(ms('0.5s'), 500);
});

test('parse: minutes', () => {
  assert.equal(ms('1m'), 60000);
  assert.equal(ms('2min'), 120000);
});

test('parse: hours', () => {
  assert.equal(ms('1h'), 3600000);
  assert.equal(ms('2hrs'), 7200000);
});

test('parse: days', () => {
  assert.equal(ms('1d'), 86400000);
  assert.equal(ms('2 days'), 172800000);
});

test('parse: weeks', () => {
  assert.equal(ms('1w'), 604800000);
});

test('parse: negative', () => {
  assert.equal(ms('-1s'), -1000);
});

test('format: short', () => {
  assert.equal(ms(1000), '1s');
  assert.equal(ms(60000), '1m');
  assert.equal(ms(3600000), '1h');
  assert.equal(ms(86400000), '1d');
  assert.equal(ms(500), '500ms');
});

test('format: long', () => {
  assert.equal(ms(1000, { long: true }), '1 second');
  assert.equal(ms(2000, { long: true }), '2 seconds');
  assert.equal(ms(86400000, { long: true }), '1 day');
});

test('throws on invalid input', () => {
  assert.throws(() => ms(undefined));
  assert.throws(() => ms(null));
  assert.throws(() => ms(''));
});

test('ReDoS safe: long input does not cause backtracking', () => {
  const start = performance.now();
  for (let i = 0; i < 1000; i++) ms('9'.repeat(1000) + 'z');
  const elapsed = performance.now() - start;
  assert.ok(elapsed < 50, `Expected < 50ms, got ${elapsed.toFixed(1)}ms`);
});
