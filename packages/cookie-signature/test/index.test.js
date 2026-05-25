'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { sign, unsign } = require('../src/index.js');

describe('cookie-signature', () => {
  describe('sign()', () => {
    it('should sign value', () => {
      const result = sign('hello', 'secret');
      assert.ok(result.includes('.'));
      assert.ok(result.startsWith('hello.'));
    });

    it('should produce consistent signature for same input', () => {
      const result1 = sign('hello', 'secret');
      const result2 = sign('hello', 'secret');
      assert.strictEqual(result1, result2);
    });

    it('should produce different signature for different secret', () => {
      const result1 = sign('hello', 'secret1');
      const result2 = sign('hello', 'secret2');
      assert.notStrictEqual(result1, result2);
    });

    it('should throw on non-string value', () => {
      assert.throws(() => sign(123, 'secret'), TypeError);
    });

    it('should throw on non-string secret', () => {
      assert.throws(() => sign('hello', 123), TypeError);
    });
  });

  describe('unsign()', () => {
    it('should verify and return original value', () => {
      const signed = sign('hello', 'secret');
      const result = unsign(signed, 'secret');
      assert.strictEqual(result, 'hello');
    });

    it('should return false for invalid signature', () => {
      const result = unsign('hello.wrong', 'secret');
      assert.strictEqual(result, false);
    });

    it('should return false for tampered value', () => {
      const signed = sign('hello', 'secret');
      const tampered = signed.slice(0, -1) + 'x';
      const result = unsign(tampered, 'secret');
      assert.strictEqual(result, false);
    });

    it('should return false for malformed input', () => {
      assert.strictEqual(unsign('no-dot', 'secret'), false);
    });

    it('should throw on non-string value', () => {
      assert.throws(() => unsign(123, 'secret'), TypeError);
    });

    it('should throw on non-string secret', () => {
      assert.throws(() => unsign('hello', 123), TypeError);
    });
  });
});