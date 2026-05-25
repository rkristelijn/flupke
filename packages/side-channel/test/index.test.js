'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const SideChannel = require('../src/index.js');

describe('side-channel', () => {
  it('should export a function', () => {
    assert.strictEqual(typeof SideChannel, 'function');
  });

  it('should create a channel with get/set/has', () => {
    const ch = SideChannel();
    assert.strictEqual(typeof ch.get, 'function');
    assert.strictEqual(typeof ch.set, 'function');
    assert.strictEqual(typeof ch.has, 'function');
  });

  it('should store and retrieve values by key', () => {
    const ch = SideChannel();
    const key = {};
    ch.set(key, 'value');
    assert.strictEqual(ch.get(key), 'value');
  });

  it('should report has correctly', () => {
    const ch = SideChannel();
    const key = {};
    assert.strictEqual(ch.has(key), false);
    ch.set(key, 42);
    assert.strictEqual(ch.has(key), true);
  });

  it('should return undefined for missing keys', () => {
    const ch = SideChannel();
    assert.strictEqual(ch.get({}), undefined);
  });

  it('should isolate channels', () => {
    const ch1 = SideChannel();
    const ch2 = SideChannel();
    const key = {};
    ch1.set(key, 'a');
    ch2.set(key, 'b');
    assert.strictEqual(ch1.get(key), 'a');
    assert.strictEqual(ch2.get(key), 'b');
  });
});
