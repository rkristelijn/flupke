'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fresh = require('../src/index.js');

describe('fresh', () => {
  it('should return true when ETag matches', () => {
    const result = fresh(
      { 'if-none-match': '"abc"' },
      { etag: '"abc"' }
    );
    assert.strictEqual(result, true);
  });

  it('should return true when ETag matches with weak validator', () => {
    const result = fresh(
      { 'if-none-match': '"abc"' },
      { etag: 'W/"abc"' }
    );
    assert.strictEqual(result, true);
  });

  it('should return false when ETag does not match', () => {
    const result = fresh(
      { 'if-none-match': '"abc"' },
      { etag: '"xyz"' }
    );
    assert.strictEqual(result, false);
  });

  it('should return true when If-Modified-Since is after Last-Modified', () => {
    const result = fresh(
      { 'if-modified-since': 'Mon, 01 Jan 2024 00:00:00 GMT' },
      { 'last-modified': 'Sun, 31 Dec 2023 00:00:00 GMT' }
    );
    assert.strictEqual(result, true);
  });

  it('should return false when If-Modified-Since is before Last-Modified', () => {
    const result = fresh(
      { 'if-modified-since': 'Sun, 31 Dec 2023 00:00:00 GMT' },
      { 'last-modified': 'Mon, 01 Jan 2024 00:00:00 GMT' }
    );
    assert.strictEqual(result, false);
  });

  it('should return false when no cache headers present', () => {
    const result = fresh({}, {});
    assert.strictEqual(result, false);
  });

  it('should return false for non-GET/HEAD methods', () => {
    const result = fresh(
      { method: 'POST', 'if-none-match': '"abc"' },
      { etag: '"abc"' }
    );
    assert.strictEqual(result, false);
  });

  it('should handle multiple ETags in If-None-Match', () => {
    const result = fresh(
      { 'if-none-match': '"xyz", "abc", "123"' },
      { etag: '"abc"' }
    );
    assert.strictEqual(result, true);
  });
});