#!/usr/bin/env node
// scripts/scan-api-usage.js — Scan how frameworks use flupke-replaceable packages.
//
// Installs a framework, scans node_modules source to find how each flupke-replaceable
// package is actually called (functions, methods, properties).
//
// Usage:
//   node scripts/scan-api-usage.js express 5.2.1
//   node scripts/scan-api-usage.js --all
//
// Output: data/api-usage/<framework>/<version>.json
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FRAMEWORKS = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/frameworks.json'), 'utf8')).frameworks;
const OUT_DIR = path.join(ROOT, 'data/api-usage');
const TMP_BASE = path.join(ROOT, '.tmp/api-scan');

const FLUPKE_PACKAGES = new Set(
  fs.readdirSync(path.join(ROOT, 'packages'))
    .filter(d => d !== 'cli' && fs.existsSync(path.join(ROOT, 'packages', d, 'package.json')))
);
FLUPKE_PACKAGES.add('isarray');

function install(npmPkg, version) {
  const dir = path.join(TMP_BASE, `${npmPkg.replace(/[/@]/g, '_')}-${version}`);
  if (fs.existsSync(path.join(dir, 'node_modules'))) return dir;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: 'scan', private: true }));
  try {
    execSync(`npm install "${npmPkg}@${version}" --ignore-scripts --no-audit --no-fund`, {
      cwd: dir, timeout: 120000, stdio: ['pipe', 'pipe', 'pipe']
    });
  } catch { console.error(`  ✗ Install failed`); return null; }
  return dir;
}

function findJsFiles(dir, results = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return results; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === '.bin' || e.name === '.package-lock.json') continue;
      findJsFiles(full, results);
    } else if (/\.(js|cjs|mjs)$/.test(e.name) && !e.name.endsWith('.min.js')) {
      results.push(full);
    }
  }
  return results;
}

function extractUsage(content, pkg) {
  const hits = [];
  const lines = content.split('\n');
  const esc = pkg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  let varName = null;
  const destructured = [];

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    let m;

    m = ln.match(new RegExp(`(?:const|let|var)\\s+(\\w+)\\s*=\\s*require\\(['"]${esc}['"]\\)`));
    if (m) { varName = m[1]; continue; }

    m = ln.match(new RegExp(`(?:const|let|var)\\s*\\{([^}]+)\\}\\s*=\\s*require\\(['"]${esc}['"]\\)`));
    if (m) { m[1].split(',').forEach(s => destructured.push(s.trim().split(/\s+as\s+|:/)[0].trim())); continue; }

    m = ln.match(new RegExp(`import\\s+(\\w+)\\s+from\\s+['"]${esc}['"]`));
    if (m) { varName = m[1]; continue; }

    m = ln.match(new RegExp(`import\\s*\\{([^}]+)\\}\\s*from\\s+['"]${esc}['"]`));
    if (m) { m[1].split(',').forEach(s => destructured.push(s.trim().split(/\s+as\s+/)[0].trim())); continue; }

    // require("pkg")(args) — immediate invocation
    m = ln.match(new RegExp(`require\\(['"]${esc}['"]\\)\\s*\\(([^)]*)\\)`));
    if (m) { hits.push({ type: 'call', member: null, signature: `${pkg}(${summarize(m[1])})` }); }
  }

  // Second pass: find usage
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    if (ln.includes('require(')) continue;

    if (varName) {
      const callRe = new RegExp(`(?<![.\\w])${varName}\\s*\\(([^)]*?)\\)`, 'g');
      let cm;
      while ((cm = callRe.exec(ln)) !== null) {
        hits.push({ type: 'call', member: null, signature: `${pkg}(${summarize(cm[1])})` });
      }
      const methodRe = new RegExp(`${varName}\\.(\\w+)\\s*\\(([^)]*?)\\)`, 'g');
      while ((cm = methodRe.exec(ln)) !== null) {
        hits.push({ type: 'method', member: cm[1], signature: `${pkg}.${cm[1]}(${summarize(cm[2])})` });
      }
      const propRe = new RegExp(`${varName}\\.(\\w+)\\b(?!\\s*\\()`, 'g');
      while ((cm = propRe.exec(ln)) !== null) {
        if (cm[1].length > 2) hits.push({ type: 'property', member: cm[1], signature: `${pkg}.${cm[1]}` });
      }
    }

    for (const fn of destructured) {
      const fnRe = new RegExp(`(?<![.\\w])${fn}\\s*\\(([^)]*?)\\)`, 'g');
      let cm;
      while ((cm = fnRe.exec(ln)) !== null) {
        hits.push({ type: 'call', member: fn, signature: `${pkg}.${fn}(${summarize(cm[1])})` });
      }
    }
  }

  return hits;
}

function summarize(args) {
  if (!args || !args.trim()) return '';
  return args.split(',').map(a => {
    a = a.trim();
    if (!a) return '';
    if (/^['"`]/.test(a)) return 'string';
    if (/^\d/.test(a)) return a;
    if (/^(true|false|null|undefined)$/.test(a)) return a;
    if (/^\{/.test(a)) return 'object';
    if (/^\[/.test(a)) return 'array';
    return 'expr';
  }).join(', ');
}

function scanUsage(dir) {
  const nm = path.join(dir, 'node_modules');
  const allFiles = findJsFiles(nm);
  const results = {};

  for (const pkg of FLUPKE_PACKAGES) {
    if (!fs.existsSync(path.join(nm, pkg))) continue;
    const pkgDir = path.join(nm, pkg);

    // Find files that reference this package (exclude the package itself)
    const relevantFiles = allFiles.filter(f => !f.startsWith(pkgDir + '/'));
    const allHits = [];

    for (const file of relevantFiles) {
      let content;
      try { content = fs.readFileSync(file, 'utf8'); } catch { continue; }
      if (!content.includes(`'${pkg}'`) && !content.includes(`"${pkg}"`)) continue;
      allHits.push(...extractUsage(content, pkg));
    }

    // Deduplicate by signature
    const seen = new Set();
    const unique = allHits.filter(h => {
      if (seen.has(h.signature)) return false;
      seen.add(h.signature);
      return true;
    });

    if (unique.length) results[pkg] = unique;
  }

  return results;
}

function resolveVersion(npmPkg, major) {
  try {
    const raw = execSync(`npm view "${npmPkg}@${major}" version --json`, { encoding: 'utf8', timeout: 15000 }).trim();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed;
  } catch { return null; }
}

function processFramework(fw) {
  console.log(`\n▶ ${fw.name} (${fw.npm})`);
  for (const major of fw.majors) {
    const version = resolveVersion(fw.npm, major);
    if (!version) { console.error(`  ⚠ Could not resolve ${fw.npm}@${major}`); continue; }
    console.log(`  Scanning ${fw.npm}@${version}...`);
    const dir = install(fw.npm, version);
    if (!dir) continue;

    const usage = scanUsage(dir);
    const pkgCount = Object.keys(usage).length;
    const sigCount = Object.values(usage).reduce((s, a) => s + a.length, 0);

    const outDir = path.join(OUT_DIR, fw.name);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, `${version}.json`), JSON.stringify({
      framework: fw.name, npm: fw.npm, version,
      generated: new Date().toISOString().split('T')[0],
      packages_with_usage: pkgCount,
      total_signatures: sigCount,
      usage
    }, null, 2) + '\n');

    console.log(`  ✓ ${pkgCount} packages, ${sigCount} signatures`);
  }
}

// Main
const args = process.argv.slice(2);
if (args[0] === '--all') {
  const depDir = path.join(ROOT, 'data/dep-fingerprints');
  const relevant = FRAMEWORKS.filter(fw => {
    const fwDir = path.join(depDir, fw.name);
    if (!fs.existsSync(fwDir)) return false;
    return fs.readdirSync(fwDir).some(f => {
      const d = JSON.parse(fs.readFileSync(path.join(fwDir, f), 'utf8'));
      return d.replaceable_count > 0;
    });
  });
  console.log(`Scanning ${relevant.length} frameworks with replaceable deps...`);
  for (const fw of relevant) processFramework(fw);
} else if (args.length >= 2) {
  const name = args[0];
  const version = args[1];
  const fw = FRAMEWORKS.find(f => f.name === name);
  if (!fw) { console.error(`Unknown: ${name}`); process.exit(1); }
  console.log(`Scanning ${fw.npm}@${version}...`);
  const dir = install(fw.npm, version);
  if (dir) {
    const usage = scanUsage(dir);
    const outDir = path.join(OUT_DIR, fw.name);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, `${version}.json`), JSON.stringify({
      framework: fw.name, npm: fw.npm, version,
      generated: new Date().toISOString().split('T')[0],
      packages_with_usage: Object.keys(usage).length,
      total_signatures: Object.values(usage).reduce((s, a) => s + a.length, 0),
      usage
    }, null, 2) + '\n');
    console.log(`✓ ${Object.keys(usage).length} packages, ${Object.values(usage).reduce((s, a) => s + a.length, 0)} signatures`);
  }
} else {
  console.log('Usage: node scripts/scan-api-usage.js --all | <framework> <version>');
}
