'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const styles = require('../src/index.js');

test('has color styles', () => {
  assert.ok(styles.red);
  assert.ok(styles.green);
  assert.ok(styles.blue);
});

test('has reset style', () => {
  assert.deepStrictEqual(styles.reset, [0, 0]);
});

test('style format is [open, close]', () => {
  assert.strictEqual(styles.red.length, 2);
});