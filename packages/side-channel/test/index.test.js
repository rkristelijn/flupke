'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const sideChannel = require('../src/index.js');

test('creates channel', () => {
  const obj = {};
  const ch = sideChannel.getChannel(obj);
  assert.ok(ch);
  assert.ok('get' in ch);
  assert.ok('has' in ch);
});

test('sets channel', () => {
  const obj = {};
  const ch = { get: 1, has: 2, shape: [] };
  sideChannel.setChannel(obj, ch);
  assert.strictEqual(sideChannel.getChannel(obj), ch);
});