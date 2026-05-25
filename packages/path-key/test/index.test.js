'use strict';
const { it } = require('node:test');
const assert = require('node:assert/strict');
const pathKey = require('../src/index.js');
it('returns PATH on unix', () => { assert.strictEqual(pathKey({ platform: 'linux' }), 'PATH'); });
it('returns Path on windows', () => { assert.strictEqual(pathKey({ platform: 'win32', env: { Path: '' } }), 'Path'); });
