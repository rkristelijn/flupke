const { test } = require('node:test');
const assert = require('node:assert/strict');
const norm = require('../src/index.js');
test('backslash', () => { assert.equal(norm('a\\b\\c'), 'a/b/c'); });
test('double slash', () => { assert.equal(norm('a//b'), 'a/b'); });
test('trailing slash', () => { assert.equal(norm('a/b/'), 'a/b'); });
