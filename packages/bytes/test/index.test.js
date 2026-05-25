'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const bytes = require('../src/index.js');

describe('bytes', () => {
  describe('parse()', () => {
    it('should parse bytes', () => {
      assert.strictEqual(bytes.parse('1024'), 1024);
    });

    it('should parse KB', () => {
      assert.strictEqual(bytes.parse('1KB'), 1024);
      assert.strictEqual(bytes.parse('2 KB'), 2048);
    });

    it('should parse MB', () => {
      assert.strictEqual(bytes.parse('1MB'), 1024 * 1024);
    });

    it('should parse GB', () => {
      assert.strictEqual(bytes.parse('1GB'), 1024 * 1024 * 1024);
    });

    it('should parse case-insensitive', () => {
      assert.strictEqual(bytes.parse('1kb'), 1024);
      assert.strictEqual(bytes.parse('1Kb'), 1024);
    });

    it('should return NaN for invalid input', () => {
      assert.ok(isNaN(bytes.parse('invalid')));
      assert.ok(isNaN(bytes.parse('10x')));
    });

    it('should throw on non-string', () => {
      assert.throws(() => bytes.parse(1024), TypeError);
    });
  });

  describe('format()', () => {
    it('should format bytes', () => {
      assert.strictEqual(bytes.format(1024), '1KB');
    });

    it('should format to bytes', () => {
      assert.strictEqual(bytes.format(500), '500B');
    });

    it('should format to MB', () => {
      assert.strictEqual(bytes.format(1024 * 1024), '1MB');
    });

    it('should format to GB', () => {
      assert.strictEqual(bytes.format(1024 * 1024 * 1024), '1GB');
    });

    it('should format 0', () => {
      assert.strictEqual(bytes.format(0), '0B');
    });

    it('should handle large numbers', () => {
      assert.strictEqual(bytes.format(1024 * 1024 * 1024 * 1024), '1TB');
    });
  });
});