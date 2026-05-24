#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');

// All packages @flupkejs provides
const REPLACEMENTS = [
  'aggregate-error','ansi-regex','ansi-styles','balanced-match','call-bind','callsites',
  'camelcase','classnames','clean-stack','cliui','clsx','color-convert','color-name',
  'concat-map','cross-spawn','debug','decamelize','deep-equal','deepmerge',
  'define-data-property','delay',
  'dotenv-expand','emoji-regex','es-define-property','es-errors','escalade',
  'escape-string-regexp','eventemitter3','execa','fast-deep-equal','filter-obj','find-up',
  'function-bind',
  'get-caller-file','get-intrinsic','globby','gopd','graceful-fs','has-flag','has-proto',
  'has-symbols','hasown','human-readable','import-fresh','indent-string','inflight',
  'inherits','is-array','is-buffer','is-fullwidth-code-point','is-glob','is-number',
  'is-stream','locate-path','lru-cache','map-obj','mem','memoize-one','mimic-fn','minipass',
  'mkdirp','ms','nanoid','normalize-path','object-inspect','once','onetime','p-limit',
  'p-locate','p-map','p-queue','parent-module','path-exists','path-is-absolute','path-type',
  'pify','pkg-dir','qs','require-directory','resolve-from','retry','rimraf','safe-buffer',
  'semver','set-function-length','side-channel','signal-exit','slash','sort-keys',
  'string-width','strip-ansi','strip-indent','supports-color','tempy','type-detect',
  'type-fest','util-deprecate','uuid','which','wrap-ansi','wrappy','y18n','yallist',
  'yargs-parser'
];

function detectPackageManager(dir) {
  if (fs.existsSync(path.join(dir, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(dir, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

function findInstalled(dir) {
  const nm = path.join(dir, 'node_modules');
  if (!fs.existsSync(nm)) return [];
  return fs.readdirSync(nm).filter(f => !f.startsWith('.') && !f.startsWith('@'));
}

function findReplaceable(installed) {
  return REPLACEMENTS.filter(p => installed.includes(p));
}

function writeOverrides(dir, pm, replaceable) {
  const pkgPath = path.join(dir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const overrides = {};
  for (const p of replaceable) {
    overrides[p] = `npm:@flupkejs/${p}@^1.0.0`;
  }

  if (pm === 'pnpm') {
    pkg.pnpm = pkg.pnpm || {};
    pkg.pnpm.overrides = { ...(pkg.pnpm.overrides || {}), ...overrides };
  } else if (pm === 'yarn') {
    pkg.resolutions = { ...(pkg.resolutions || {}), ...overrides };
  } else {
    pkg.overrides = { ...(pkg.overrides || {}), ...overrides };
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

function run() {
  const dir = process.cwd();
  const pkgPath = path.join(dir, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    console.error('  No package.json found in current directory.');
    process.exit(1);
  }

  const pm = detectPackageManager(dir);
  const installed = findInstalled(dir);
  const replaceable = findReplaceable(installed);

  // Header
  console.log('');
  console.log('  \x1b[1mflupke\x1b[0m — dependency cleanup');
  console.log('');

  if (replaceable.length === 0) {
    console.log('  No replaceable packages found.');
    console.log('');
    return;
  }

  // Before stats
  const totalPkgs = installed.length;

  // Write overrides
  writeOverrides(dir, pm, replaceable);

  // Report
  const field = pm === 'pnpm' ? 'pnpm.overrides' : pm === 'yarn' ? 'resolutions' : 'overrides';
  console.log(`  Scanned:   ${totalPkgs} packages in node_modules`);
  console.log(`  Replaced:  ${replaceable.length} packages → @flupkejs/* equivalents`);
  console.log('');
  console.log('  Packages replaced:');
  for (const p of replaceable) {
    console.log(`    ✓ ${p}`);
  }
  console.log('');
  console.log(`  \x1b[32m✓\x1b[0m ${field} written to package.json`);
  console.log('');
  const cmd = pm === 'pnpm' ? 'pnpm install' : pm === 'yarn' ? 'yarn install' : 'npm install';
  console.log(`  Run \x1b[1m${cmd}\x1b[0m to apply.`);
  console.log('');
}

run();
