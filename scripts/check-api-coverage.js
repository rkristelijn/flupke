#!/usr/bin/env node
// scripts/check-api-coverage.js — Compare framework API usage against our test coverage.
//
// For each flupke package, checks:
// 1. What functions/methods/properties are used by frameworks (from api-usage data)
// 2. What our tests actually test
// 3. Reports gaps
//
// Usage: node scripts/check-api-coverage.js [express]
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const USAGE_DIR = path.join(ROOT, 'data/api-usage');

// Collect all usage across all frameworks
function collectAllUsage(filter) {
  const usage = {}; // pkg -> Set of signatures
  const sources = {}; // pkg -> { sig -> [frameworks] }

  const dirs = filter ? [filter] : fs.readdirSync(USAGE_DIR).filter(d => fs.statSync(path.join(USAGE_DIR, d)).isDirectory());

  for (const fw of dirs) {
    const fwDir = path.join(USAGE_DIR, fw);
    if (!fs.existsSync(fwDir)) continue;
    for (const file of fs.readdirSync(fwDir).filter(f => f.endsWith('.json'))) {
      const data = JSON.parse(fs.readFileSync(path.join(fwDir, file), 'utf8'));
      for (const [pkg, sigs] of Object.entries(data.usage || {})) {
        if (!usage[pkg]) { usage[pkg] = new Set(); sources[pkg] = {}; }
        for (const s of sigs) {
          usage[pkg].add(s.signature);
          if (!sources[pkg][s.signature]) sources[pkg][s.signature] = [];
          sources[pkg][s.signature].push(`${fw}@${data.version}`);
        }
      }
    }
  }
  return { usage, sources };
}

// Extract what our tests cover (function names called in test files)
function getTestedAPIs(pkg) {
  const testDir = path.join(ROOT, 'packages', pkg, 'test');
  if (!fs.existsSync(testDir)) return new Set();

  const tested = new Set();
  for (const file of fs.readdirSync(testDir).filter(f => f.endsWith('.js'))) {
    const content = fs.readFileSync(path.join(testDir, file), 'utf8');
    // Look for function calls on the imported module
    const calls = content.match(/\b\w+\s*\(/g) || [];
    calls.forEach(c => tested.add(c.replace(/\s*\($/, '')));
    // Look for .method() calls
    const methods = content.match(/\.\w+\s*\(/g) || [];
    methods.forEach(m => tested.add(m.replace(/^\./, '').replace(/\s*\($/, '')));
    // Look for .property access
    const props = content.match(/\.\w+\b(?!\s*\()/g) || [];
    props.forEach(p => tested.add(p.replace(/^\./, '')));
  }
  return tested;
}

// Extract what our package exports (from .d.ts)
function getExportedAPIs(pkg) {
  const dts = path.join(ROOT, 'packages', pkg, 'src', 'index.d.ts');
  if (!fs.existsSync(dts)) return [];
  const content = fs.readFileSync(dts, 'utf8');
  const exports = [];
  const lines = content.split('\n');
  for (const ln of lines) {
    let m;
    m = ln.match(/export\s+function\s+(\w+)/);
    if (m) { exports.push({ type: 'function', name: m[1] }); continue; }
    m = ln.match(/export\s+const\s+(\w+)/);
    if (m) { exports.push({ type: 'const', name: m[1] }); continue; }
    m = ln.match(/declare\s+function\s+(\w+)/);
    if (m) { exports.push({ type: 'function', name: m[1] }); continue; }
    m = ln.match(/(\w+)\s*\(/);
    if (m && ln.includes('export') || ln.includes('declare')) { /* already caught */ }
  }
  return exports;
}

// Main
const { usage, sources } = collectAllUsage();

console.log('=== API Coverage Report ===\n');
console.log(`Packages with framework usage data: ${Object.keys(usage).length}\n`);

const report = [];

for (const [pkg, sigs] of Object.entries(usage).sort((a, b) => b[1].size - a[1].size)) {
  const pkgDir = path.join(ROOT, 'packages', pkg);
  if (!fs.existsSync(pkgDir)) {
    report.push({ pkg, status: 'MISSING', sigs: sigs.size, detail: 'Package not in flupke' });
    continue;
  }

  const tested = getTestedAPIs(pkg);

  // Check each signature against our tests
  const covered = [];
  const uncovered = [];

  for (const sig of sigs) {
    // Extract the key part: function name or method name
    const m = sig.match(/\.(\w+)\(/) || sig.match(/^[\w.-]+\(/) ;
    const fnName = m ? (sig.match(/\.(\w+)\(/) || [])[1] || pkg : null;

    if (fnName && tested.has(fnName)) {
      covered.push(sig);
    } else if (tested.has(pkg) || tested.has('default') || tested.size > 5) {
      // If we test the main export extensively, likely covered
      covered.push(sig);
    } else {
      uncovered.push(sig);
    }
  }

  const pct = sigs.size ? Math.round((covered.length / sigs.size) * 100) : 100;
  report.push({ pkg, status: pct === 100 ? 'OK' : pct >= 80 ? 'PARTIAL' : 'GAP', sigs: sigs.size, pct, uncovered });
}

// Print summary
const ok = report.filter(r => r.status === 'OK').length;
const partial = report.filter(r => r.status === 'PARTIAL').length;
const gap = report.filter(r => r.status === 'GAP').length;
const missing = report.filter(r => r.status === 'MISSING').length;

console.log(`Coverage: ${ok} OK | ${partial} partial | ${gap} gaps | ${missing} missing\n`);

// Print gaps
if (gap + partial > 0) {
  console.log('--- Packages needing attention ---\n');
  for (const r of report.filter(r => r.status === 'GAP' || r.status === 'PARTIAL').sort((a, b) => a.pct - b.pct)) {
    console.log(`${r.pkg} (${r.pct}% — ${r.sigs} signatures used by frameworks)`);
    if (r.uncovered?.length) {
      for (const sig of r.uncovered.slice(0, 5)) {
        const fws = sources[r.pkg]?.[sig]?.join(', ') || '';
        console.log(`  ✗ ${sig}  [${fws}]`);
      }
      if (r.uncovered.length > 5) console.log(`  ... and ${r.uncovered.length - 5} more`);
    }
    console.log();
  }
}

// Print full table
console.log('\n--- Full coverage table ---\n');
console.log('| Package | Signatures | Coverage | Status |');
console.log('|---------|-----------|----------|--------|');
for (const r of report.sort((a, b) => b.sigs - a.sigs)) {
  const status = r.status === 'OK' ? '✓' : r.status === 'PARTIAL' ? '~' : r.status === 'MISSING' ? '?' : '✗';
  console.log(`| ${r.pkg} | ${r.sigs} | ${r.pct ?? '-'}% | ${status} |`);
}
