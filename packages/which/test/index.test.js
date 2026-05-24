const { test } = require('node:test');
const assert = require('node:assert/strict');
const which = require('../src/index.js');
test('finds node', () => { assert.ok(which('node').includes('node')); });
test('throws on missing', () => { assert.throws(() => which('nonexistent-xyz-cmd-flupke')); });
test('sync works', () => { assert.ok(which.sync('node').includes('node')); });
