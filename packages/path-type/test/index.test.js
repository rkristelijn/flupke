const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isFile, isDirectory } = require('../src/index.js');
test('isFile', async () => { assert.equal(await isFile(__filename), true); assert.equal(await isFile(__dirname), false); });
test('isDirectory', async () => { assert.equal(await isDirectory(__dirname), true); assert.equal(await isDirectory(__filename), false); });
test('missing path', async () => { assert.equal(await isFile('/nope'), false); });
