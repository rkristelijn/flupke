'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const errors = require('../src/index.js');

test('exports all error types', () => {
  assert.ok(errors.TypeError);
  assert.ok(errors.RangeError);
  assert.ok(errors.SyntaxError);
  assert.ok(errors.EvalError);
  assert.ok(errors.ReferenceError);
  assert.ok(errors.URIError);
});

test('error types are constructors', () => {
  assert.equal(typeof errors.TypeError, 'function');
  assert.equal(typeof errors.RangeError, 'function');
});