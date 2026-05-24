const { test } = require('node:test');
const assert = require('node:assert/strict');
const { ensureLeading, removeTrailing, ensureTrailing } = require('../src/index.js');
test('ensureLeading', () => { assert.equal(ensureLeading('foo'), '/foo'); assert.equal(ensureLeading('/foo'), '/foo'); });
test('removeTrailing', () => { assert.equal(removeTrailing('foo/'), 'foo'); assert.equal(removeTrailing('/'), '/'); });
test('ensureTrailing', () => { assert.equal(ensureTrailing('foo'), 'foo/'); assert.equal(ensureTrailing('foo/'), 'foo/'); });
