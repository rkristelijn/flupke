const { test } = require('node:test');
const assert = require('node:assert/strict');
const locatePath = require('../src/index.js');
test('finds existing', async () => { const r = await locatePath(['package.json','nope'], {cwd:__dirname+'/../'}); assert.equal(r,'package.json'); });
test('returns undefined', async () => { const r = await locatePath(['nope1','nope2']); assert.equal(r,undefined); });
test('respects cwd', async () => { const r = await locatePath(['index.test.js'], {cwd:__dirname}); assert.equal(r,'index.test.js'); });
