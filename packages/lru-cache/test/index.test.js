'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const LRUCache = require('../src/index.js');

test('stores and retrieves', () => {
  const cache = new LRUCache({ max: 3 });
  cache.set('a', 1);
  assert.strictEqual(cache.get('a'), 1);
});

test('evicts oldest', () => {
  const cache = new LRUCache({ max: 3 });
  cache.set('a', 1);
  cache.set('b', 2);
  cache.set('c', 3);
  cache.set('d', 4);
  assert.strictEqual(cache.get('a'), undefined);
  assert.strictEqual(cache.get('d'), 4);
});

test('has method', () => {
  const cache = new LRUCache({ max: 3 });
  cache.set('a', 1);
  assert.strictEqual(cache.has('a'), true);
  assert.strictEqual(cache.has('b'), false);
});

test('delete method', () => {
  const cache = new LRUCache({ max: 3 });
  cache.set('a', 1);
  cache.delete('a');
  assert.strictEqual(cache.has('a'), false);
});