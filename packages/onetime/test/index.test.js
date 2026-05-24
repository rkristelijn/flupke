const { test } = require('node:test');
const assert = require('node:assert/strict');
const onetime = require('../src/index.js');
test('calls once', () => { let c=0; const fn=onetime(()=>++c); fn();fn(); assert.equal(c,1); });
test('called()', () => { const fn=onetime(()=>{}); assert.equal(fn.called(),false); fn(); assert.equal(fn.called(),true); });
test('returns value', () => { const fn=onetime(()=>42); assert.equal(fn(),42); assert.equal(fn(),42); });
