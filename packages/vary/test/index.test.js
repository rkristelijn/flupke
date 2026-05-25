'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const vary = require('../src/index.js');

describe('vary', () => {
  it('should add field to empty Vary header', () => {
    const res = { getHeader: () => '', setHeader: (n, v) => { res.vary = v; } };
    vary(res, 'Accept-Encoding');
    assert.strictEqual(res.vary, 'accept-encoding');
  });

  it('should append new field', () => {
    const res = { getHeader: () => 'accept-encoding', setHeader: (n, v) => { res.vary = v; } };
    vary(res, 'Accept');
    assert.strictEqual(res.vary, 'accept-encoding, accept');
  });

  it('should not duplicate existing field', () => {
    const res = { getHeader: () => 'accept-encoding', setHeader: (n, v) => { res.vary = v; } };
    vary(res, 'Accept-Encoding');
    assert.strictEqual(res.vary, 'accept-encoding');
  });

  it('should be case-insensitive for duplicates', () => {
    const res = { getHeader: () => 'Accept-Encoding', setHeader: (n, v) => { res.vary = v; } };
    vary(res, 'accept-encoding');
    assert.strictEqual(res.vary, 'Accept-Encoding');
  });

  it('should throw on invalid response', () => {
    assert.throws(() => vary(null, 'Accept'), TypeError);
  });

  it('should handle multiple fields', () => {
    const res = { 
      getHeader: () => res.vary, 
      setHeader: (n, v) => { res.vary = v; } 
    };
    vary(res, 'Accept');
    vary(res, 'Accept-Encoding');
    vary(res, 'Accept-Language');
    assert.strictEqual(res.vary, 'accept, accept-encoding, accept-language');
  });
});

describe('vary.append', () => {
  it('should append to header string', () => {
    const result = vary.append('accept-encoding', 'accept');
    assert.strictEqual(result, 'accept-encoding, accept');
  });

  it('should handle empty header', () => {
    const result = vary.append('', 'accept');
    assert.strictEqual(result, 'accept');
  });

  it('should handle null header', () => {
    const result = vary.append(null, 'accept');
    assert.strictEqual(result, 'accept');
  });

  it('should not duplicate', () => {
    const result = vary.append('accept-encoding', 'Accept-Encoding');
    assert.strictEqual(result, 'accept-encoding');
  });
});