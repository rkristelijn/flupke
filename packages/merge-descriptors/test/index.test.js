'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const merge = require('../src/index.js');

describe('merge-descriptors', () => {
  it('should copy property descriptors from src to dest', () => {
    const dest = {};
    const src = Object.create(null);
    Object.defineProperty(src, 'name', { value: 'test', configurable: true });
    merge(dest, src);
    assert.strictEqual(dest.name, 'test');
    const desc = Object.getOwnPropertyDescriptor(dest, 'name');
    assert.strictEqual(desc.configurable, true);
    assert.strictEqual(desc.writable, false);
  });

  it('should copy non-enumerable properties', () => {
    const dest = {};
    const src = {};
    Object.defineProperty(src, 'hidden', { value: 'secret', enumerable: false });
    merge(dest, src);
    assert.strictEqual(dest.hidden, 'secret');
    assert.strictEqual(Object.getOwnPropertyDescriptor(dest, 'hidden').enumerable, false);
  });

  it('should return dest', () => {
    const dest = {};
    const result = merge(dest, { a: 1 });
    assert.strictEqual(result, dest);
  });

  it('should redefine by default', () => {
    const dest = { x: 1 };
    merge(dest, { x: 2 });
    assert.strictEqual(dest.x, 2);
  });

  it('should not redefine when redefine=false', () => {
    const dest = { x: 1 };
    merge(dest, { x: 2 }, false);
    assert.strictEqual(dest.x, 1);
  });

  it('should redefine when redefine=true', () => {
    const dest = { x: 1 };
    merge(dest, { x: 2 }, true);
    assert.strictEqual(dest.x, 2);
  });

  it('should handle getters and setters', () => {
    const dest = {};
    const src = {};
    Object.defineProperty(src, 'val', { get: () => 42, enumerable: true });
    merge(dest, src);
    assert.strictEqual(dest.val, 42);
  });
});
