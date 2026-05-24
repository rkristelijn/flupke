'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const stripAnsi = require('../src/index.js');

test('strips ANSI codes', () => {
  assert.strictEqual(stripAnsi('\x1b[31mred\x1b[0m'), 'red');
});

test('handles plain text', () => {
  assert.strictEqual(stripAnsi('hello'), 'hello');
});