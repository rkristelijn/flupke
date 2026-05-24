const { test } = require('node:test');
const assert = require('node:assert/strict');
const parentModule = require('../src/index.js');
test('returns string or undefined', () => { const r = parentModule(); assert.ok(r === undefined || typeof r === 'string'); });
test('function exists', () => { assert.equal(typeof parentModule, 'function'); });
test('does not throw', () => { assert.doesNotThrow(() => parentModule()); });
