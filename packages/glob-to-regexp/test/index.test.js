'use strict';
const { it } = require('node:test');
const assert = require('node:assert/strict');
const g2r = require('../src/index.js');
it('matches glob', () => { assert.ok(g2r('*.js').test('foo.js')); assert.ok(!g2r('*.js').test('foo.txt')); });
it('double star', () => { assert.ok(g2r('**/*.js').test('src/foo.js')); });
it('question mark', () => { assert.ok(g2r('?.js').test('a.js')); assert.ok(!g2r('?.js').test('ab.js')); });
