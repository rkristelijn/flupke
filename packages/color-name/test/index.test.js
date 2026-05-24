'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const colorName = require('../src/index.js');

test('is frozen object', () => {
  assert.ok(Object.isFrozen(colorName));
});

test('has common colors', () => {
  assert.deepStrictEqual(colorName.red, [255, 0, 0]);
  assert.deepStrictEqual(colorName.blue, [0, 0, 255]);
  assert.deepStrictEqual(colorName.green, [0, 128, 0]);
});

test('has white and black', () => {
  assert.deepStrictEqual(colorName.black, [0, 0, 0]);
  assert.deepStrictEqual(colorName.white, [255, 255, 255]);
});