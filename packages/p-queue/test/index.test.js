const { test } = require('node:test');
const assert = require('node:assert/strict');
const PQueue = require('../src/index.js');
test('limits concurrency', async () => { const q=new PQueue({concurrency:1}); let max=0,cur=0; const fn=()=>q.add(async()=>{cur++;max=Math.max(max,cur);await new Promise(r=>setTimeout(r,5));cur--;}); await Promise.all([fn(),fn(),fn()]); assert.equal(max,1); });
test('returns value', async () => { const q=new PQueue(); const r=await q.add(async()=>42); assert.equal(r,42); });
test('size and pending', async () => { const q=new PQueue({concurrency:1}); q.add(()=>new Promise(r=>setTimeout(r,50))); q.add(()=>Promise.resolve()); assert.equal(q.pending,1); });
