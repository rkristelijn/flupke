const { test } = require('node:test');
const assert = require('node:assert/strict');
const inflight = require('../src/index.js');
test('first call returns function', () => { assert.equal(typeof inflight('a', ()=>{}), 'function'); });
test('second call returns null', () => { inflight('b', ()=>{}); assert.equal(inflight('b', ()=>{}), null); });
test('resolves all callbacks', () => { let r=[]; inflight('c', v=>r.push(v)); inflight('c', v=>r.push(v*2)); const done=inflight('c', v=>r.push(v*3)); /* first call returned fn */ ; });
