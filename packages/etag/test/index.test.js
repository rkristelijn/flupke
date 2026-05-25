'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const etag = require('../src/index.js');

describe('etag', () => {
  it('should generate strong etag for string', () => {
    const result = etag('hello');
    assert.ok(result.startsWith('"'));
    assert.ok(!result.startsWith('W/"'));
  });

  it('should generate weak etag when weak option is true', () => {
    const result = etag('hello', { weak: true });
    assert.ok(result.startsWith('W/"'));
  });

  it('should generate etag for Buffer', () => {
    const result = etag(Buffer.from('hello'));
    assert.ok(result.startsWith('"'));
  });

  it('should generate consistent etag for same input', () => {
    const result1 = etag('hello');
    const result2 = etag('hello');
    assert.strictEqual(result1, result2);
  });

  it('should generate different etag for different input', () => {
    const result1 = etag('hello');
    const result2 = etag('world');
    assert.notStrictEqual(result1, result2);
  });

  it('should throw on null input', () => {
    assert.throws(() => etag(null), TypeError);
  });

  it('should throw on undefined input', () => {
    assert.throws(() => etag(undefined), TypeError);
  });

  it('should throw on non-string/buffer/object input', () => {
    assert.throws(() => etag(123), TypeError);
  });
});