const { test } = require('node:test');
const assert = require('node:assert/strict');
const pify = require('../src/index.js');
test('promisifies', async () => { const fn = pify((cb) => cb(null, 42)); assert.equal(await fn(), 42); });
test('rejects on error', async () => { const fn = pify((cb) => cb(new Error('no'))); await assert.rejects(fn()); });
test('passes args', async () => { const fn = pify((a, b, cb) => cb(null, a+b)); assert.equal(await fn(1,2), 3); });
