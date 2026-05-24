const { test } = require('node:test');
const assert = require('node:assert/strict');
const esc = require('../src/index.js');
test('escapes special chars', () => { assert.equal(esc('a.b'), 'a\\.b'); });
test('works in regex', () => { const r = new RegExp(esc('(foo)')); assert.ok(r.test('(foo)')); });
test('handles empty', () => { assert.equal(esc(''), ''); });
