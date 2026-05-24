const { test } = require('node:test');
const assert = require('node:assert/strict');
const filterObj = require('../src/index.js');
test('filters', () => { assert.deepEqual(filterObj({a:1,b:2,c:3}, (k,v)=>v>1), {b:2,c:3}); });
test('by key', () => { assert.deepEqual(filterObj({foo:1,bar:2}, k=>k==='foo'), {foo:1}); });
test('empty result', () => { assert.deepEqual(filterObj({a:1}, ()=>false), {}); });
