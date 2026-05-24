const { test } = require('node:test');
const assert = require('node:assert/strict');
const sortKeys = require('../src/index.js');
test('sorts keys', () => { assert.deepEqual(Object.keys(sortKeys({b:1,a:2})), ['a','b']); });
test('deep', () => { const r = sortKeys({b:{z:1,a:2},a:1},{deep:true}); assert.deepEqual(Object.keys(r.b),['a','z']); });
test('preserves values', () => { assert.deepEqual(sortKeys({b:2,a:1}), {a:1,b:2}); });
