const { test } = require('node:test');
const assert = require('node:assert/strict');
const camelCase = require('../src/index.js');
test('kebab', () => { assert.equal(camelCase('foo-bar'), 'fooBar'); });
test('snake', () => { assert.equal(camelCase('foo_bar'), 'fooBar'); });
test('space', () => { assert.equal(camelCase('foo bar'), 'fooBar'); });
