const { test } = require('node:test');
const assert = require('node:assert/strict');
const isNumber = require('../src/index.js');
test('numbers', () => { assert.equal(isNumber(0),true); assert.equal(isNumber(1.5),true); assert.equal(isNumber(-3),true); });
test('not numbers', () => { assert.equal(isNumber(NaN),false); assert.equal(isNumber(Infinity),false); assert.equal(isNumber('1'),false); assert.equal(isNumber(null),false); });
test('edge cases', () => { assert.equal(isNumber(Number.MAX_SAFE_INTEGER),true); assert.equal(isNumber(0/0),false); });
