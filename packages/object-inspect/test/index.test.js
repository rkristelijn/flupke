'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const inspect = require('../src/index.js');

test('is a function', () => {
  assert.equal(typeof inspect, 'function');
});

test('inspects objects', () => {
  const result = inspect({ a: 1 });
  assert.ok(result.includes('a'));
});