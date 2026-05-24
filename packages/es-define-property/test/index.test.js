'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const defineProperty = require('../src/index.js');

test('is Object.defineProperty', () => {
  assert.equal(defineProperty, Object.defineProperty);
});

test('defines property', () => {
  const obj = {};
  defineProperty(obj, 'x', { value: 1, writable: true, enumerable: true, configurable: true });
  assert.equal(obj.x, 1);
});