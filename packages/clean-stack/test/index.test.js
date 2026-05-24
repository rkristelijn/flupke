const { test } = require('node:test');
const assert = require('node:assert/strict');
const clean = require('../src/index.js');
test('removes node_modules', () => { assert.ok(!clean('Error\n  at x (node_modules/y)').includes('node_modules')); });
test('keeps user code', () => { assert.ok(clean('Error\n  at foo (/app/src/x.js)').includes('/app/src')); });
test('removes internal', () => { assert.ok(!clean('Error\n  at internal/main.js').includes('internal/')); });
