const { test } = require('node:test');
const assert = require('node:assert/strict');
const expand = require('../src/index.js');
test('expands ${VAR}', () => { const r = expand({parsed:{A:'hello',B:'${A} world'}}); assert.equal(r.parsed.B,'hello world'); });
test('expands $VAR', () => { const r = expand({parsed:{X:'1',Y:'$X+2'}}); assert.equal(r.parsed.Y,'1+2'); });
test('handles missing vars', () => { const r = expand({parsed:{A:'${NOPE}'}}); assert.equal(r.parsed.A,''); });
