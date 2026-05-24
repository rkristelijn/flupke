const { test } = require('node:test');
const assert = require('node:assert/strict');
const cliui = require('../src/index.js');
test('creates columns', () => { const ui = cliui({width:20}); ui.div('a','b'); assert.ok(ui.toString().length > 0); });
test('pads text', () => { const ui = cliui({width:20}); ui.div('hi','there'); assert.equal(ui.toString().length, 20); });
test('multiple rows', () => { const ui = cliui(); ui.div('row1'); ui.div('row2'); assert.ok(ui.toString().includes('\n')); });
