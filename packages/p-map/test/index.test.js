const { test } = require('node:test');
const assert = require('node:assert/strict');
const pMap = require('../src/index.js');
test('maps all', async () => { const r = await pMap([1,2,3], async x=>x*2); assert.deepEqual(r,[2,4,6]); });
test('concurrency', async () => { let max=0,cur=0; await pMap([1,2,3,4], async()=>{cur++;max=Math.max(max,cur);await new Promise(r=>setTimeout(r,5));cur--;},{concurrency:2}); assert.ok(max<=2); });
test('preserves order', async () => { const r = await pMap([3,1,2], async x=>{await new Promise(r=>setTimeout(r,x));return x}); assert.deepEqual(r,[3,1,2]); });
