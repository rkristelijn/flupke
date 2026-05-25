'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const createError = require('../src/index.js');

describe('http-errors', () => {
  it('should create error with status and message', () => {
    const err = createError(404, 'Not Found');
    assert.strictEqual(err.status, 404);
    assert.strictEqual(err.message, 'Not Found');
    assert.strictEqual(err.expose, true);
    assert.ok(err instanceof Error);
  });

  it('should default message from status', () => {
    const err = createError(500);
    assert.strictEqual(err.message, 'Internal Server Error');
    assert.strictEqual(err.expose, false);
  });

  it('should have named constructors', () => {
    const err = new createError.NotFound('gone');
    assert.strictEqual(err.status, 404);
    assert.strictEqual(err.message, 'gone');
    assert.ok(err instanceof Error);
  });

  it('should have numeric constructors', () => {
    const err = new createError[503]();
    assert.strictEqual(err.status, 503);
  });

  it('isHttpError should detect http errors', () => {
    assert.strictEqual(createError.isHttpError(createError(404)), true);
    assert.strictEqual(createError.isHttpError(new Error()), false);
    assert.strictEqual(createError.isHttpError(null), false);
  });

  it('4xx should be exposed, 5xx should not', () => {
    assert.strictEqual(createError(400).expose, true);
    assert.strictEqual(createError(499).expose, true);
    assert.strictEqual(createError(500).expose, false);
    assert.strictEqual(createError(503).expose, false);
  });
});
