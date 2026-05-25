'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const contentDisposition = require('../src/index.js');

describe('content-disposition', () => {
  describe('contentDisposition()', () => {
    it('should create attachment header', () => {
      const result = contentDisposition('file.txt');
      assert.ok(result.includes('attachment'));
      assert.ok(result.includes('file.txt'));
    });

    it('should escape special characters in filename', () => {
      const result = contentDisposition('file"name.txt');
      assert.ok(result.includes('\\"'));
    });

    it('should include filename* for fallback', () => {
      const result = contentDisposition('path/to/file.txt', { fallback: true });
      assert.ok(result.includes('filename*='));
    });

    it('should not include filename* when fallback is false', () => {
      const result = contentDisposition('path/to/file.txt', { fallback: false });
      assert.ok(!result.includes('filename*='));
    });

    it('should handle empty filename', () => {
      const result = contentDisposition('');
      assert.strictEqual(result, 'attachment');
    });

    it('should handle inline type', () => {
      const result = contentDisposition('image.png', { type: 'inline' });
      assert.ok(result.startsWith('inline'));
    });
  });

  describe('parse()', () => {
    it('should parse simple header', () => {
      const result = contentDisposition.parse('attachment; filename="file.txt"');
      assert.strictEqual(result.type, 'attachment');
      assert.strictEqual(result.filename, 'file.txt');
    });

    it('should parse filename* with utf-8', () => {
      const result = contentDisposition.parse('attachment; filename*=utf-8\'\'file%20name.txt');
      assert.strictEqual(result.filename, 'file name.txt');
    });

    it('should return null for empty header', () => {
      assert.strictEqual(contentDisposition.parse(''), null);
    });

    it('should handle missing filename', () => {
      const result = contentDisposition.parse('attachment');
      assert.strictEqual(result.type, 'attachment');
      assert.strictEqual(result.filename, null);
    });
  });
});