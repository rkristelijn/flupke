const { test } = require('node:test');
const assert = require('node:assert/strict');
const pkgDir = require('../src/index.js');
test('finds package dir', async () => { const r = await pkgDir(__dirname); assert.ok(r.endsWith('pkg-dir')); });
test('returns undefined at root', async () => { const r = await pkgDir('/'); assert.equal(r,undefined); });
test('works with cwd', async () => { const r = await pkgDir('.'); assert.ok(typeof r === 'string'); });
