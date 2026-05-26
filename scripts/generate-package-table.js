#!/usr/bin/env node
// scripts/generate-package-table.js — Generate master package table with all metrics.
//
// Outputs: docs/packages.md
// Columns: Package, LOC, Consumers (frameworks), Perf vs original, Bundle impact, Mutation score
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PKG_DIR = path.join(ROOT, "packages");
const DEP_FP_DIR = path.join(ROOT, "data/dep-fingerprints");
const MUT_DIR = path.join(ROOT, "data/mutations");

// Known original LOC
const ORIG_LOC = {
  chalk:300,minimatch:900,glob:1200,micromatch:1600,braces:800,"fill-range":250,
  debug:350,ms:100,semver:1800,inherits:30,"graceful-fs":400,lodash:17000,
  "safe-buffer":80,"function-bind":120,once:30,wrappy:30,rimraf:250,mkdirp:200,
  "supports-color":150,"has-flag":15,picocolors:80,"strip-ansi":15,"ansi-styles":200,
  kleur:90,"object-assign":20,cors:250,"p-retry":80,"cross-env":150,uuid:400,
  deepmerge:200,axios:3000,eventemitter3:350,cookie:200,etag:80,depd:200,vary:50,
  statuses:100,"http-errors":200,"path-to-regexp":500,qs:800,negotiator:400,
  "ipaddr.js":500,"mime-types":100,"content-type":100,"escape-html":30,encodeurl:50,
  parseurl:100,"on-finished":100,fresh:120,"range-parser":80,forwarded:50,unpipe:30,
  "yargs-parser":1200,"cross-spawn":200,"signal-exit":200,picomatch:1500,
  "fast-json-stable-stringify":60,"lru-cache":800,nanoid:150,dotenv:200,moment:18000,
  clsx:40,"p-limit":60,"p-map":80,camelcase:50,"is-glob":30,"balanced-match":60,
};

// Known perf improvements
const PERF = {
  "ipaddr.js":"+1507%","path-to-regexp":"+105%",negotiator:"+46%",ms:"+19%",
  inherits:"+5%","function-bind":"+2%",
};

// Collect consumers per package from fingerprints
function getConsumers() {
  const consumers = {};
  if (!fs.existsSync(DEP_FP_DIR)) return consumers;
  for (const fw of fs.readdirSync(DEP_FP_DIR)) {
    const fwDir = path.join(DEP_FP_DIR, fw);
    if (!fs.statSync(fwDir).isDirectory()) continue;
    for (const f of fs.readdirSync(fwDir)) {
      const d = JSON.parse(fs.readFileSync(path.join(fwDir, f), "utf8"));
      for (const pkg of Object.keys(d.deps || {})) {
        if (!consumers[pkg]) consumers[pkg] = new Set();
        consumers[pkg].add(fw);
      }
    }
  }
  return consumers;
}

// Get mutation scores
function getMutationScores() {
  const scores = {};
  if (!fs.existsSync(MUT_DIR)) return scores;
  for (const f of fs.readdirSync(MUT_DIR).filter(f => f.endsWith(".json"))) {
    const d = JSON.parse(fs.readFileSync(path.join(MUT_DIR, f), "utf8"));
    let k = 0, s = 0;
    for (const file of Object.values(d.files || {})) {
      for (const m of file.mutants || []) {
        if (m.status === "Killed" || m.status === "Timeout") k++;
        if (m.status === "Survived") s++;
      }
    }
    scores[f.replace(".json", "")] = k + s > 0 ? Math.round((k / (k + s)) * 100) : null;
  }
  return scores;
}

const pkgs = fs.readdirSync(PKG_DIR)
  .filter(d => d !== "cli" && fs.existsSync(path.join(PKG_DIR, d, "src/index.js")))
  .sort();

const consumers = getConsumers();
const mutations = getMutationScores();

let out = `# Package Overview\n\n`;
out += `${pkgs.length} packages. Generated ${new Date().toISOString().split("T")[0]}.\n\n`;
out += `| Package | LOC | Original | Reduction | Frameworks | Perf | Mutation |\n`;
out += `|---------|-----|----------|-----------|------------|------|----------|\n`;

for (const pkg of pkgs) {
  const src = fs.readFileSync(path.join(PKG_DIR, pkg, "src/index.js"), "utf8");
  const loc = src.split("\n").filter(l => l.trim() && !l.trim().startsWith("//")).length;
  const orig = ORIG_LOC[pkg];
  const reduction = orig ? `-${Math.round((1 - loc / orig) * 100)}%` : "";
  const fwCount = consumers[pkg] ? consumers[pkg].size : 0;
  const perf = PERF[pkg] || "";
  const mut = mutations[pkg] != null ? `${mutations[pkg]}%` : "";
  out += `| \`${pkg}\` | ${loc} | ${orig || ""} | ${reduction} | ${fwCount} | ${perf} | ${mut} |\n`;
}

fs.writeFileSync(path.join(ROOT, "docs/packages.md"), out);
console.log(`Written docs/packages.md (${pkgs.length} packages)`);
