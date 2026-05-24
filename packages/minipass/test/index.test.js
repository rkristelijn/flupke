const { test } = require('node:test');
const assert = require('node:assert/strict');
const Minipass = require('../src/index.js');
test('is a transform stream', () => { const s = new Minipass(); assert.equal(typeof s.pipe, 'function'); });
test('passes data through', (t, done) => { const s = new Minipass({transform(c,e,cb){cb(null,c)}}); let d=''; s.on('data',c=>d+=c); s.on('end',()=>{assert.equal(d,'hello');done()}); s.end('hello'); });
test('is writable', () => { const s = new Minipass(); assert.equal(typeof s.write, 'function'); });
