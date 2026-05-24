const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const mkdirp = require('../src/index.js');
const rimraf = require('../../rimraf/src/index.js');
test('creates nested dirs', async () => { const d=path.join(__dirname,'_tmp/a/b/c'); await mkdirp(d); assert.ok(fs.existsSync(d)); await rimraf(path.join(__dirname,'_tmp')); });
test('sync', () => { const d=path.join(__dirname,'_s/a/b'); mkdirp.sync(d); assert.ok(fs.existsSync(d)); fs.rmSync(path.join(__dirname,'_s'),{recursive:true}); });
test('returns path', async () => { const d=path.join(__dirname,'_r'); const r=await mkdirp(d); assert.equal(r,d); fs.rmSync(d,{recursive:true}); });
