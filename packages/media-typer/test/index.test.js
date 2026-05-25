'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const typer = require('../src/index.js');

describe('media-typer', () => {
  describe('parse', () => {
    it('should parse basic media type', () => {
      const result = typer.parse('text/html');
      assert.strictEqual(result.type, 'text');
      assert.strictEqual(result.subtype, 'html');
    });

    it('should parse media type with suffix', () => {
      const result = typer.parse('application/vnd.api+json');
      assert.strictEqual(result.type, 'application');
      assert.strictEqual(result.subtype, 'vnd.api');
      assert.strictEqual(result.suffix, 'json');
    });

    it('should lowercase type and subtype', () => {
      const result = typer.parse('Text/HTML');
      assert.strictEqual(result.type, 'text');
      assert.strictEqual(result.subtype, 'html');
    });

    it('should throw on invalid media type', () => {
      assert.throws(() => typer.parse('invalid'), TypeError);
      assert.throws(() => typer.parse('/html'), TypeError);
    });

    it('should throw on non-string', () => {
      assert.throws(() => typer.parse(null), TypeError);
    });
  });

  describe('format', () => {
    it('should format basic media type', () => {
      assert.strictEqual(typer.format({ type: 'text', subtype: 'html' }), 'text/html');
    });

    it('should format with suffix', () => {
      assert.strictEqual(typer.format({ type: 'application', subtype: 'vnd.api', suffix: 'json' }), 'application/vnd.api+json');
    });

    it('should throw on invalid object', () => {
      assert.throws(() => typer.format(null), TypeError);
      assert.throws(() => typer.format({ type: 'text' }), TypeError);
    });
  });

  describe('test', () => {
    it('should return true for valid media types', () => {
      assert.strictEqual(typer.test('text/html'), true);
      assert.strictEqual(typer.test('application/json'), true);
    });

    it('should return false for invalid media types', () => {
      assert.strictEqual(typer.test('invalid'), false);
      assert.strictEqual(typer.test('text/html; charset=utf-8'), false);
    });

    it('should return false for non-strings', () => {
      assert.strictEqual(typer.test(null), false);
      assert.strictEqual(typer.test(42), false);
    });
  });
});
