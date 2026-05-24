#!/usr/bin/env node
/**
 * flupke override generator
 * Scans your package-lock.json and generates overrides for neglected packages.
 * Usage: node scripts/generate-overrides.js [path-to-project]
 */
const fs = require('node:fs');
const path = require('node:path');

const REPLACEMENTS = {
  'isarray': '@flupke/is-array',
  'inherits': '@flupke/inherits',
  'safe-buffer': '@flupke/safe-buffer',
  'ms': '@flupke/ms',
  'function-bind': '@flupke/function-bind',
};

const projectDir = process.argv[2] || process.cwd();
const lockPath = path.join(projectDir, 'package-lock.json');
const pkgPath = path.join(projectDir, 'package.json');

if (!fs.existsSync(lockPath)) {
  console.error('No package-lock.json found at', projectDir);
  process.exit(1);
}

const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
const packages = lock.packages || {};

const found = {};
for (const [depPath] of Object.entries(packages)) {
  const name = depPath.replace(/.*node_modules\//, '');
  if (REPLACEMENTS[name]) {
    found[name] = REPLACEMENTS[name];
  }
}

if (Object.keys(found).length === 0) {
  console.log('✓ No neglected packages found in your dependency tree.');
  process.exit(0);
}

console.log(`Found ${Object.keys(found).length} replaceable packages:\n`);

const overrides = {};
for (const [original, replacement] of Object.entries(found)) {
  overrides[original] = `npm:${replacement}@^1.0.0`;
  console.log(`  ${original} → ${replacement}`);
}

console.log('\nAdd to your package.json:\n');
console.log(JSON.stringify({ overrides }, null, 2));

// Optionally patch package.json
if (process.argv.includes('--apply') && fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.overrides = { ...pkg.overrides, ...overrides };
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('\n✓ Applied to package.json. Run `npm install` to update.');
}
