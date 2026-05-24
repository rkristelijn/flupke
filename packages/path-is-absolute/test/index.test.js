const { test } = require('node:test');
const assert = require('node:assert/strict');
const isAbs = require('../src/index.js');
test('absolute paths', () => { assert.equal(isAbs('/foo'),true); assert.equal(isAbs('/'),true); });
test('relative paths', () => { assert.equal(isAbs('foo'),false); assert.equal(isAbs('./bar'),false); });
test('empty string', () => { assert.equal(isAbs(''),false); });
