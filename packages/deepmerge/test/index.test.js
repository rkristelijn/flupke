const { test } = require('node:test');
const assert = require('node:assert/strict');
const deepmerge = require('../src/index.js');

test('merges flat objects', () => { assert.deepEqual(deepmerge({a:1}, {b:2}), {a:1, b:2}); });
test('merges nested objects', () => { assert.deepEqual(deepmerge({a:{b:1}}, {a:{c:2}}), {a:{b:1,c:2}}); });
test('overwrites primitives', () => { assert.deepEqual(deepmerge({a:1}, {a:2}), {a:2}); });
test('merges arrays by concat', () => { assert.deepEqual(deepmerge({a:[1]}, {a:[2]}), {a:[1,2]}); });
test('deepmerge.all', () => { assert.deepEqual(deepmerge.all([{a:1},{b:2},{c:3}]), {a:1,b:2,c:3}); });
test('does not mutate source', () => { var a={x:1}; deepmerge(a,{y:2}); assert.equal(a.y, undefined); });
