#!/usr/bin/env node
/**
 * flupke integration pipeline
 * Proves: install → build → size → flupke → rebuild → size → verify
 *
 * Usage: node scripts/integration-test.js [framework]
 * Example: node scripts/integration-test.js express
 */
'use strict';
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CLI = path.join(ROOT, 'packages/cli/src/index.js');

// Framework definitions: install command, build command, verify function
const FRAMEWORKS = {
  express: {
    deps: 'express',
    setup(dir) {
      fs.writeFileSync(path.join(dir, 'app.js'), `
const express = require('express');
const app = express();
app.use(express.json());
app.get('/test', (req, res) => res.json({ status: 'ok' }));
app.get('/user/:id', (req, res) => res.json({ id: req.params.id }));
app.post('/echo', (req, res) => res.json(req.body));
app.get('/negotiate', (req, res) => res.json({ type: req.accepts(['json','html']) }));
module.exports = app;
`);
      fs.writeFileSync(path.join(dir, 'verify.js'), `
const app = require('./app');
const server = app.listen(0, async () => {
  const base = 'http://localhost:' + server.address().port;
  let pass = 0, fail = 0;
  async function t(name, url, opts, check) {
    const r = await fetch(base + url, opts);
    const d = await r.json();
    if (check(d, r)) pass++; else { fail++; console.error('FAIL: ' + name); }
  }
  await t('GET', '/test', {}, d => d.status === 'ok');
  await t('Params', '/user/42', {}, d => d.id === '42');
  await t('POST', '/echo', {method:'POST',headers:{'content-type':'application/json'},body:'{"a":1}'}, d => d.a === 1);
  await t('Negotiate', '/negotiate', {headers:{accept:'application/json'}}, d => d.type === 'json');
  server.close();
  console.log(pass + '/' + (pass+fail) + ' features verified');
  process.exit(fail > 0 ? 1 : 0);
});
`);
    },
    verify: 'node verify.js',
  },
  nestjs: {
    deps: '@nestjs/core @nestjs/common @nestjs/platform-express reflect-metadata rxjs typescript @types/node',
    setup(dir) {
      fs.writeFileSync(path.join(dir, 'tsconfig.json'), JSON.stringify({
        compilerOptions: { module: 'commonjs', target: 'ES2021', experimentalDecorators: true, emitDecoratorMetadata: true, outDir: 'dist', esModuleInterop: true, skipLibCheck: true, types: ['node'] }
      }));
      fs.writeFileSync(path.join(dir, 'app.ts'), `
import 'reflect-metadata';
import { Module, Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Controller()
class AppController {
  @Get('/test') getTest() { return { status: 'ok' }; }
  @Get('/user/:id') getUser(@Param('id') id: string) { return { id }; }
  @Post('/echo') echo(@Body() body: any) { return body; }
}

@Module({ controllers: [AppController] })
class AppModule {}

async function main() {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.listen(0);
  const base = await app.getUrl();
  let pass = 0, fail = 0;
  async function t(name: string, url: string, opts: any, check: Function) {
    const r = await fetch(base + url, opts);
    const d = await r.json();
    if (check(d, r)) pass++; else { fail++; console.error('FAIL: ' + name); }
  }
  await t('GET', '/test', {}, (d:any) => d.status === 'ok');
  await t('Params', '/user/42', {}, (d:any) => d.id === '42');
  await t('POST', '/echo', {method:'POST',headers:{'content-type':'application/json'},body:'{"a":1}'}, (d:any) => d.a === 1);
  console.log(pass + '/' + (pass+fail) + ' features verified');
  await app.close();
  process.exit(fail > 0 ? 1 : 0);
}
main();
`);
    },
    build: 'npx tsc',
    verify: 'node dist/app.js',
  },
};

// --- Pipeline ---

function run(cmd, opts) {
  return execSync(cmd, { encoding: 'utf8', timeout: 120000, stdio: 'pipe', ...opts }).trim();
}

function dirSize(dir) {
  try {
    const out = run(`du -sk "${dir}"`);
    return parseInt(out.split('\t')[0]) * 1024;
  } catch { return 0; }
}

function formatBytes(bytes) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  return (bytes / 1024).toFixed(0) + ' KB';
}

function copyFlupkePackages(dir) {
  const pkgDir = path.join(ROOT, 'packages');
  const packages = fs.readdirSync(pkgDir).filter(p => p !== 'cli');
  let copied = 0;
  for (const pkg of packages) {
    const src = path.join(pkgDir, pkg, 'src/index.js');
    if (!fs.existsSync(src)) continue;
    // Find all instances in node_modules
    const targets = run(`find "${dir}/node_modules" -maxdepth 3 -type d -name "${pkg}" 2>/dev/null || true`).split('\n').filter(Boolean);
    for (const target of targets) {
      const destSrc = path.join(target, 'src/index.js');
      const destIdx = path.join(target, 'index.js');
      if (fs.existsSync(path.join(target, 'src'))) {
        fs.copyFileSync(src, destSrc);
        copied++;
      } else if (fs.existsSync(destIdx)) {
        fs.copyFileSync(src, destIdx);
        copied++;
      }
    }
  }
  return copied;
}

function pipeline(name) {
  const fw = FRAMEWORKS[name];
  if (!fw) { console.error('Unknown framework: ' + name + '\nAvailable: ' + Object.keys(FRAMEWORKS).join(', ')); process.exit(1); }

  const dir = path.join('/tmp', 'flupke-pipeline-' + name);
  console.log(`\n  flupke integration pipeline: ${name}\n  ${'─'.repeat(40)}\n`);

  // Step 1: Install
  console.log('  1. Installing ' + name + '...');
  run(`rm -rf "${dir}" && mkdir -p "${dir}"`);
  run('npm init -y --silent 2>/dev/null', { cwd: dir });
  run(`npm install ${fw.deps} --silent 2>&1`, { cwd: dir });
  fw.setup(dir);

  // Step 2: Build (if needed)
  if (fw.build) {
    console.log('  2. Building...');
    run(fw.build, { cwd: dir });
  } else {
    console.log('  2. No build step needed');
  }

  // Step 3: Measure size BEFORE
  const sizeBefore = dirSize(path.join(dir, 'node_modules'));
  console.log(`  3. Size before: ${formatBytes(sizeBefore)}`);

  // Step 4: Run flupke CLI
  console.log('  4. Running flupke...');
  const cliOutput = run(`node "${CLI}" --dry-run`, { cwd: dir });
  const replaced = cliOutput.match(/Replaced:\s+(\d+)/)?.[1] || '0';
  console.log(`     → ${replaced} packages replaceable`);

  // Step 5: Apply flupke (copy local packages)
  const copied = copyFlupkePackages(dir);
  console.log(`  5. Applied flupke (${copied} files copied)`);

  // Step 6: Rebuild (if needed)
  if (fw.build) {
    console.log('  6. Rebuilding...');
    run(fw.build, { cwd: dir });
  } else {
    console.log('  6. No rebuild needed');
  }

  // Step 7: Measure size AFTER
  const sizeAfter = dirSize(path.join(dir, 'node_modules'));
  const saved = sizeBefore - sizeAfter;
  const pct = sizeBefore > 0 ? ((saved / sizeBefore) * 100).toFixed(1) : '0';
  console.log(`  7. Size after:  ${formatBytes(sizeAfter)} (${saved > 0 ? '-' : '+'}${formatBytes(Math.abs(saved))}, ${pct}% saved)`);

  // Step 8: Verify features
  console.log('  8. Verifying features...');
  try {
    const result = run(fw.verify, { cwd: dir });
    console.log(`     → ${result}`);
    console.log(`\n  ✓ PASSED: ${name}\n`);
  } catch (e) {
    console.log(`     → FAILED: ${e.stderr || e.message}`);
    console.log(`\n  ✗ FAILED: ${name}\n`);
    process.exit(1);
  }
}

// Run
const target = process.argv[2] || 'express';
if (target === 'all') {
  for (const name of Object.keys(FRAMEWORKS)) pipeline(name);
} else {
  pipeline(target);
}
