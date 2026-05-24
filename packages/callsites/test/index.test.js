const { test } = require('node:test');
const assert = require('node:assert/strict');
const callsites = require('../src/index.js');
test('returns array', () => { assert.ok(Array.isArray(callsites())); });
test('has getFileName', () => { assert.ok(callsites()[0].getFileName().includes('index.test.js')); });
test('has getLineNumber', () => { assert.equal(typeof callsites()[0].getLineNumber(), 'number'); });
