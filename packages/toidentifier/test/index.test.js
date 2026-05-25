'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const toIdentifier = require('../src/index.js');

describe('toidentifier', () => {
  it('should convert simple string', () => {
    assert.strictEqual(toIdentifier('foo bar'), 'FooBar');
  });

  it('should handle hyphenated string', () => {
    assert.strictEqual(toIdentifier('foo-bar'), 'FooBar');
  });

  it('should handle underscored string', () => {
    assert.strictEqual(toIdentifier('foo_bar'), 'FooBar');
  });

  it('should handle mixed separators', () => {
    assert.strictEqual(toIdentifier('foo-bar_baz'), 'FooBarBaz');
  });

  it('should lowercase subsequent letters', () => {
    assert.strictEqual(toIdentifier('FOO BAR'), 'FooBar');
  });

  it('should handle single word', () => {
    assert.strictEqual(toIdentifier('hello'), 'Hello');
  });

  it('should handle empty string', () => {
    assert.strictEqual(toIdentifier(''), '');
  });

  it('should handle leading numbers', () => {
    assert.strictEqual(toIdentifier('123abc'), '_123abc');
  });

  it('should throw on non-string', () => {
    assert.throws(() => toIdentifier(123), TypeError);
  });
});