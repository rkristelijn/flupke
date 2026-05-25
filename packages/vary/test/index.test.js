'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const vary = require('../src/index.js');

describe('vary', () => {
  it('should add field to empty Vary header', () => {
    const res = { getHeader: () => '', setHeader: (n, v) => { res.vary = v; } };
    vary(res, 'Accept-Encoding');
    assert.strictEqual(res.vary, 'Accept-Encoding');
  });

  it('should append new field', () => {
    const res = { getHeader: () => 'Accept-Encoding', setHeader: (n, v) => { res.vary = v; } };
    vary(res, 'Accept');
    assert.strictEqual(res.vary, 'Accept-Encoding, Accept');
  });

  it('should not duplicate existing field', () => {
    const res = { getHeader: () => 'Accept-Encoding', setHeader: (n, v) => { res.vary = v; } };
    vary(res, 'Accept-Encoding');
    assert.strictEqual(res.vary, 'Accept-Encoding');
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
      vary: '',
      getHeader: () => res.vary, 
      setHeader: (n, v) => { res.vary = v; } 
    };
    vary(res, 'Accept');
    vary(res, 'Accept-Encoding');
    vary(res, 'Accept-Language');
    assert.strictEqual(res.vary, 'Accept, Accept-Encoding, Accept-Language');
  });
});

describe('vary.append', () => {
  it('should append to header string', () => {
    const result = vary.append('Accept-Encoding', 'Accept');
    assert.strictEqual(result, 'Accept-Encoding, Accept');
  });

  it('should handle empty header', () => {
    const result = vary.append('', 'Accept');
    assert.strictEqual(result, 'Accept');
  });

  it('should handle null header', () => {
    const result = vary.append(null, 'Accept');
    assert.strictEqual(result, 'Accept');
  });

  it('should not duplicate', () => {
    const result = vary.append('Accept-Encoding', 'accept-encoding');
    assert.strictEqual(result, 'Accept-Encoding');
  });
});