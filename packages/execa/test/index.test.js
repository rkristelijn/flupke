const { test } = require('node:test');
const assert = require('node:assert/strict');
const execa = require('../src/index.js');
test('runs command', async () => { const r = await execa('echo', ['hello']); assert.equal(r.stdout, 'hello'); });
test('sync', () => { const r = execa.sync('echo', ['world']); assert.equal(r.stdout, 'world'); });
test('returns exitCode', async () => { const r = await execa('true'); assert.equal(r.exitCode, 0); });
