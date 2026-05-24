const { test } = require('node:test');
const assert = require('node:assert/strict');
const pLimit = require('../src/index.js');
test('limits concurrency', async () => { const limit = pLimit(2); let max=0,cur=0; const fn = () => limit(async()=>{cur++;max=Math.max(max,cur);await new Promise(r=>setTimeout(r,10));cur--;}); await Promise.all([fn(),fn(),fn(),fn()]); assert.ok(max<=2); });
test('returns values', async () => { const limit = pLimit(1); const r = await limit(async()=>42); assert.equal(r,42); });
test('activeCount', async () => { const limit = pLimit(1); limit(()=>new Promise(r=>setTimeout(r,50))); await new Promise(r=>setTimeout(r,5)); assert.equal(limit.activeCount(),1); });
