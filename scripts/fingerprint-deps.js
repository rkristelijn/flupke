#!/usr/bin/env node
// scripts/fingerprint-deps.js — Install frameworks and record which flupke-replaceable deps appear.
//
// Usage:
//   node scripts/fingerprint-deps.js              # all frameworks
//   node scripts/fingerprint-deps.js express      # single framework
//
// Output: data/dep-fingerprints/<name>/<version>.json
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FRAMEWORKS = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/frameworks.json'), 'utf8')).frameworks;
const OUT_DIR = path.join(ROOT, 'data/dep-fingerprints');
const TMP_BASE = path.join(ROOT, '.tmp/dep-fp');

// Get flupke package names from packages/ directory
const FLUPKE_PACKAGES = new Set(
  fs.readdirSync(path.join(ROOT, 'packages'))
    .filter(d => d !== 'cli' && fs.statSync(path.join(ROOT, 'packages', d, 'package.json')).isFile())
    .map(d => {
      // Handle special cases where dir name != npm name
      const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'packages', d, 'package.json'), 'utf8'));
      return pkg.name?.startsWith('@flupkejs/') ? d : d;
    })
);

// Also add alternate npm names (isarray -> is-array dir)
const NAME_MAP = { 'is-array': 'isarray' };
for (const [dir, npm] of Object.entries(NAME_MAP)) {
  if (FLUPKE_PACKAGES.has(dir)) FLUPKE_PACKAGES.add(npm);
}

function resolveVersions(npmPkg, majors) {
  const versions = [];
  for (const major of majors) {
    try {
      const raw = execSync(`npm view "${npmPkg}@${major}" version --json`, { encoding: 'utf8', timeout: 15000 }).trim();
      const parsed = JSON.parse(raw);
      const v = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed;
      if (v) versions.push(v);
    } catch {
      console.error(`  ⚠ Could not resolve ${npmPkg}@${major}`);
    }
  }
  return versions;
}

function installAndScan(npmPkg, version) {
  const dir = path.join(TMP_BASE, `${npmPkg.replace(/[/@]/g, '_')}-${version}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: 'fp', private: true }));

  try {
    execSync(`npm install "${npmPkg}@${version}" --ignore-scripts --no-audit --no-fund`, {
      cwd: dir, encoding: 'utf8', timeout: 120000, stdio: ['pipe', 'pipe', 'pipe']
    });
  } catch (e) {
    console.error(`  ✗ Install failed: ${npmPkg}@${version}`);
    return null;
  }

  const nm = path.join(dir, 'node_modules');
  if (!fs.existsSync(nm)) return null;

  // Collect all packages in node_modules (including scoped)
  const installed = new Set();
  for (const entry of fs.readdirSync(nm)) {
    if (entry.startsWith('.')) continue;
    if (entry.startsWith('@')) {
      const scope = path.join(nm, entry);
      for (const sub of fs.readdirSync(scope)) {
        installed.add(`${entry}/${sub}`);
      }
    } else {
      installed.add(entry);
    }
  }

  // Intersect with flupke packages
  const matches = [...FLUPKE_PACKAGES].filter(p => installed.has(p)).sort();

  // Get versions of matched packages
  const deps = {};
  for (const pkg of matches) {
    try {
      const pkgJson = JSON.parse(fs.readFileSync(path.join(nm, pkg, 'package.json'), 'utf8'));
      deps[pkg] = pkgJson.version;
    } catch {
      deps[pkg] = 'unknown';
    }
  }

  return deps;
}

function fingerprint(fw) {
  console.log(`\n▶ ${fw.name} (${fw.npm})`);
  const versions = resolveVersions(fw.npm, fw.majors);
  if (!versions.length) { console.error(`  ✗ No versions resolved`); return; }

  for (const version of versions) {
    console.log(`  Installing ${fw.npm}@${version}...`);
    const deps = installAndScan(fw.npm, version);
    if (!deps) continue;

    const outDir = path.join(OUT_DIR, fw.name);
    fs.mkdirSync(outDir, { recursive: true });

    const result = {
      framework: fw.name,
      npm: fw.npm,
      version,
      generated: new Date().toISOString().split('T')[0],
      replaceable_count: Object.keys(deps).length,
      total_flupke_packages: FLUPKE_PACKAGES.size,
      deps
    };

    fs.writeFileSync(path.join(outDir, `${version}.json`), JSON.stringify(result, null, 2) + '\n');
    console.log(`  ✓ ${Object.keys(deps).length} replaceable deps → data/dep-fingerprints/${fw.name}/${version}.json`);
  }
}

// Main
const filter = process.argv[2];
const targets = filter ? FRAMEWORKS.filter(f => f.name === filter) : FRAMEWORKS;
if (!targets.length) { console.error(`Unknown framework: ${filter}`); process.exit(1); }

console.log(`Fingerprinting ${targets.length} framework(s), ${FLUPKE_PACKAGES.size} flupke packages to match against`);
for (const fw of targets) fingerprint(fw);

// Summary
console.log('\n✓ Done. Results in data/dep-fingerprints/');
