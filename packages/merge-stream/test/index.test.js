'use strict';
const { it } = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('node:stream');
const merge = require('../src/index.js');
it('merges streams', (t, done) => {
  const a = Readable.from(['a']);
  const b = Readable.from(['b']);
  const m = merge(a, b);
  const chunks = [];
  m.on('data', c => chunks.push(String(c)));
  m.on('end', () => { assert.ok(chunks.includes('a')); assert.ok(chunks.includes('b')); done(); });
});
