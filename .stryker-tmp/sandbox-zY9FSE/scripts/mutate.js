#!/usr/bin/env node
// @ts-nocheck
// scripts/mutate.js — Run mutation testing per package with results tracking.
//
// Usage:
//   node scripts/mutate.js                # all packages
//   node scripts/mutate.js ms cookie      # specific packages
//   node scripts/mutate.js --summary      # show last results
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "data/mutations");
fs.mkdirSync(OUT_DIR, { recursive: true });

const args = process.argv.slice(2);
if (args[0] === "--summary") { showSummary(); process.exit(0); }

const pkgs = args.length
  ? args
  : fs.readdirSync(path.join(ROOT, "packages"))
      .filter((d) => d !== "cli" && d !== "lodash-es" && fs.existsSync(path.join(ROOT, "packages", d, "src/index.js")));

console.log(`Mutation testing ${pkgs.length} package(s)...\n`);

for (const pkg of pkgs) {
  const src = `packages/${pkg}/src/index.js`;
  const test = `packages/${pkg}/test/*.test.js`;
  if (!fs.existsSync(path.join(ROOT, src))) continue;

  const conf = {
    mutate: [src],
    testRunner: "command",
    commandRunner: { command: `node --test ${test}` },
    reporters: ["json", "progress"],
    jsonReporter: { fileName: `data/mutations/${pkg}.json` },
    concurrency: 2,
    timeoutMS: 15000,
  };

  const confFile = path.join(ROOT, `.stryker-tmp-${pkg}.conf.js`);
  fs.writeFileSync(confFile, `module.exports = ${JSON.stringify(conf, null, 2)};\n`);

  console.log(`▶ ${pkg}`);
  try {
    execSync(`npx stryker run ${confFile}`, { cwd: ROOT, timeout: 120000, stdio: ["pipe", "pipe", "pipe"] });
  } catch { /* stryker exits non-zero if mutants survive */ }

  // Parse results
  const resultFile = path.join(OUT_DIR, `${pkg}.json`);
  if (fs.existsSync(resultFile)) {
    const data = JSON.parse(fs.readFileSync(resultFile, "utf8"));
    const files = Object.values(data.files || {});
    let killed = 0, survived = 0, timeout = 0, noCov = 0;
    for (const f of files) {
      for (const m of f.mutants || []) {
        if (m.status === "Killed") killed++;
        else if (m.status === "Survived") survived++;
        else if (m.status === "Timeout") timeout++;
        else if (m.status === "NoCoverage") noCov++;
      }
    }
    const total = killed + survived + timeout + noCov;
    const score = total ? Math.round(((killed + timeout) / total) * 100) : 100;
    console.log(`  ✓ ${score}% (${killed} killed, ${survived} survived, ${total} total)\n`);
  } else {
    console.log(`  ⚠ No results\n`);
  }

  fs.rmSync(confFile, { force: true });
}

fs.rmSync(path.join(ROOT, ".stryker-tmp"), { recursive: true, force: true });
showSummary();

function showSummary() {
  console.log("\n=== Mutation Score Summary ===\n");
  const files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".json"));
  const results = [];
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(path.join(OUT_DIR, f), "utf8"));
    const pkg = f.replace(".json", "");
    let killed = 0, survived = 0, timeout = 0, total = 0;
    for (const file of Object.values(data.files || {})) {
      for (const m of file.mutants || []) {
        total++;
        if (m.status === "Killed") killed++;
        else if (m.status === "Survived") survived++;
        else if (m.status === "Timeout") timeout++;
      }
    }
    const score = total ? Math.round(((killed + timeout) / total) * 100) : 100;
    results.push({ pkg, score, killed, survived, total });
  }
  results.sort((a, b) => a.score - b.score);
  console.log("| Package | Score | Killed | Survived | Total |");
  console.log("|---------|-------|--------|----------|-------|");
  for (const r of results) {
    const flag = r.score === 100 ? "✓" : r.score >= 80 ? "~" : "✗";
    console.log(`| ${flag} ${r.pkg} | ${r.score}% | ${r.killed} | ${r.survived} | ${r.total} |`);
  }
  const avg = results.length ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length) : 0;
  console.log(`\nAverage: ${avg}% across ${results.length} packages`);
}
