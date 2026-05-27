#!/usr/bin/env node
// @ts-nocheck
// scripts/generate-catalog.js — generates docs/catalog.md from packages/
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const pkgDir = path.join(__dirname, '..', 'packages');
const dirs = fs.readdirSync(pkgDir)
  .filter(d => d !== 'cli' && fs.statSync(path.join(pkgDir, d)).isDirectory())
  .sort();

const lines = ['# Package catalog\n', `${dirs.length} packages. Generated from \`packages/\`.\n`,
  '| Package | Description | LOC | Has types | Has tests |',
  '|---------|-------------|-----|-----------|-----------|'];

for (const name of dirs) {
  const srcFile = path.join(pkgDir, name, 'src', 'index.js');
  const dtsFile = path.join(pkgDir, name, 'src', 'index.d.ts');
  const testDir = path.join(pkgDir, name, 'test');
  const pkgJson = path.join(pkgDir, name, 'package.json');

  const loc = fs.existsSync(srcFile) ? fs.readFileSync(srcFile, 'utf8').split('\n').length : 0;
  const hasTypes = fs.existsSync(dtsFile) ? '✓' : '✗';
  const hasTests = fs.existsSync(testDir) ? '✓' : '—';
  let desc = '';
  if (fs.existsSync(pkgJson)) {
    try { desc = JSON.parse(fs.readFileSync(pkgJson, 'utf8')).description || ''; } catch {}
  }
  lines.push(`| \`${name}\` | ${desc} | ${loc} | ${hasTypes} | ${hasTests} |`);
}

fs.writeFileSync(path.join(__dirname, '..', 'docs', 'catalog.md'), lines.join('\n') + '\n');
console.log(`docs/catalog.md generated (${dirs.length} packages)`);
