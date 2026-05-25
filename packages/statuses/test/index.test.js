'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const statuses = require('../src/index.js');

describe('statuses', () => {
  it('should return message for valid code', () => {
    assert.strictEqual(statuses(200), 'OK');
    assert.strictEqual(statuses(404), 'Not Found');
    assert.strictEqual(statuses(500), 'Internal Server Error');
  });

  it('should return code for valid message', () => {
    assert.strictEqual(statuses('ok'), 200);
    assert.strictEqual(statuses('not found'), 404);
    assert.strictEqual(statuses('internal server error'), 500);
  });

  it('should return null for invalid code', () => {
    assert.strictEqual(statuses(999), null);
  });

  it('should return null for invalid message', () => {
    assert.strictEqual(statuses('invalid status'), null);
  });

  it('should have message property', () => {
    assert.strictEqual(statuses.message[200], 'OK');
    assert.strictEqual(statuses.message[404], 'Not Found');
  });

  it('should have code property', () => {
    assert.strictEqual(statuses.code['ok'], 200);
    assert.strictEqual(statuses.code['not found'], 404);
  });

  it('should have redirect property', () => {
    assert.strictEqual(statuses.redirect[301], true);
    assert.strictEqual(statuses.redirect[302], true);
    assert.strictEqual(statuses.redirect[200], undefined);
  });

  it('should have empty property', () => {
    assert.strictEqual(statuses.empty[204], true);
    assert.strictEqual(statuses.empty[304], true);
    assert.strictEqual(statuses.empty[200], undefined);
  });

  it('should have retry property', () => {
    assert.strictEqual(statuses.retry[429], true);
    assert.strictEqual(statuses.retry[500], true);
    assert.strictEqual(statuses.retry[200], undefined);
  });

  it('should throw on invalid argument type', () => {
    assert.throws(() => statuses(null), TypeError);
    assert.throws(() => statuses({}), TypeError);
  });
});