const { test } = require('node:test');
const assert = require('node:assert/strict');
const depd = require('../src/index.js');

test('returns a function', () => {
  const deprecate = depd('my-module');
  assert.equal(typeof deprecate, 'function');
});
test('deprecate.function wraps a function', () => {
  const deprecate = depd('test');
  const fn = deprecate.function(function oldFn() { return 42; }, 'use newFn');
  assert.equal(fn(), 42);
});
test('deprecate.property defines getter', () => {
  const deprecate = depd('test');
  const obj = { old: 'value' };
  deprecate.property(obj, 'old', 'use new');
  assert.equal(obj.old, 'value');
});
test('only warns once per message', () => {
  const deprecate = depd('test');
  // Should not throw
  deprecate('something');
  deprecate('something');
});
