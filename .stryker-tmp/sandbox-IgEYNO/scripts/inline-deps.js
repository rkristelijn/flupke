#!/usr/bin/env node
// @ts-nocheck
// scripts/inline-deps.js — Inline internal require("../../") references for publish.
//
// Usage: node scripts/inline-deps.js <pkg>    # preview
//        node scripts/inline-deps.js --write  # write all
//
// This ensures published packages are truly zero-dep standalone files.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const WRITE = process.argv.includes("--write");
const target = process.argv.find((a) => !a.startsWith("-") && a !== process.argv[0] && a !== process.argv[1]);

const pkgs = target
  ? [target]
  : fs.readdirSync(path.join(ROOT, "packages")).filter((d) => d !== "cli");

for (const pkg of pkgs) {
  const file = path.join(ROOT, "packages", pkg, "src/index.js");
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, "utf8");

  const refs = content.match(/require\("\.\.\/\.\.\/[^"]+"\)/g);
  if (!refs) continue;

  console.log(`${pkg}: ${refs.length} internal ref(s)`);

  for (const ref of refs) {
    const relPath = ref.match(/require\("([^"]+)"\)/)[1];
    const absPath = path.resolve(path.dirname(file), relPath);
    if (!fs.existsSync(absPath)) { console.log(`  ⚠ not found: ${relPath}`); continue; }

    const depContent = fs.readFileSync(absPath, "utf8");
    // Extract the module.exports value name or wrap in IIFE
    const varName = `__inline_${path.basename(path.dirname(path.dirname(absPath)))}`;
    const inlined = `const ${varName} = (() => { const module = { exports: {} }; const exports = module.exports;\n${depContent}\nreturn module.exports; })();`;

    content = content.replace(ref, varName);
    content = inlined + "\n" + content;
    console.log(`  ✓ inlined ${relPath} as ${varName}`);
  }

  if (WRITE) {
    const outDir = path.join(ROOT, "dist", pkg);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.js"), content);
    // Copy types
    const dts = path.join(ROOT, "packages", pkg, "src/index.d.ts");
    if (fs.existsSync(dts)) fs.copyFileSync(dts, path.join(outDir, "index.d.ts"));
  }
}

if (!WRITE) console.log("\nRun with --write to output to dist/");
