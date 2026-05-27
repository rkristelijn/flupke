#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

// All packages @flupkejs provides
const REPLACEMENTS = [
  "aggregate-error",
  "ansi-regex",
  "ansi-styles",
  "axios",
  "balanced-match",
  "base64id",
  "bytes",
  "call-bind",
  "callsites",
  "camelcase",
  "classnames",
  "clean-stack",
  "cliui",
  "clsx",
  "color-convert",
  "color-name",
  "concat-map",
  "content-disposition",
  "content-type",
  "cookie",
  "cookie-signature",
  "cross-spawn",
  "debug",
  "decamelize",
  "deep-equal",
  "deepmerge",
  "define-data-property",
  "delay",
  "depd",
  "destroy",
  "dotenv",
  "dotenv-expand",
  "ee-first",
  "emoji-regex",
  "encodeurl",
  "es-define-property",
  "es-errors",
  "escalade",
  "escape-html",
  "escape-string-regexp",
  "etag",
  "eventemitter3",
  "events",
  "execa",
  "fast-deep-equal",
  "fast-json-stable-stringify",
  "fast-levenshtein",
  "filter-obj",
  "find-up",
  "fresh",
  "forwarded",
  "function-bind",
  "get-caller-file",
  "get-intrinsic",
  "get-stream",
  "glob-to-regexp",
  "globby",
  "gopd",
  "graceful-fs",
  "has-flag",
  "has-proto",
  "has-symbols",
  "hasown",
  "http-errors",
  "human-readable",
  "import-fresh",
  "imurmurhash",
  "indent-string",
  "inflight",
  "inherits",
  "ipaddr.js",
  "is-array",
  "is-buffer",
  "is-fullwidth-code-point",
  "is-glob",
  "is-number",
  "is-path-inside",
  "is-plain-object",
  "is-promise",
  "is-stream",
  "locate-path",
  "lodash",
  "lru-cache",
  "map-obj",
  "mem",
  "memoize-one",
  "media-typer",
  "merge-descriptors",
  "merge-stream",
  "mime-types",
  "mimic-fn",
  "minipass",
  "mkdirp",
  "moment",
  "ms",
  "nanoid",
  "negotiator",
  "normalize-path",
  "object-inspect",
  "on-finished",
  "once",
  "onetime",
  "p-limit",
  "p-locate",
  "p-map",
  "p-queue",
  "parent-module",
  "parseurl",
  "path-exists",
  "path-is-absolute",
  "path-key",
  "path-to-regexp",
  "path-type",
  "picocolors",
  "picomatch",
  "pify",
  "pkg-dir",
  "qs",
  "range-parser",
  "require-directory",
  "resolve-from",
  "retry",
  "rimraf",
  "safe-buffer",
  "safer-buffer",
  "semver",
  "set-function-length",
  "setprototypeof",
  "side-channel",
  "signal-exit",
  "slash",
  "slash-trailing",
  "sort-keys",
  "statuses",
  "string-width",
  "strip-ansi",
  "strip-indent",
  "supports-color",
  "tempy",
  "toidentifier",
  "triple-beam",
  "type-detect",
  "type-fest",
  "util-deprecate",
  "uuid",
  "unpipe",
  "vary",
  "which",
  "wrap-ansi",
  "wrappy",
  "y18n",
  "yallist",
  "yargs-parser",
];

// Detect npm, yarn, or pnpm based on lockfile presence
function detectPackageManager(dir) {
  if (fs.existsSync(path.join(dir, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(dir, "yarn.lock"))) return "yarn";
  return "npm";
}

// List all installed packages using the package manager
function findInstalled(pm, dir) {
  const nm = path.join(dir, "node_modules");
  if (!fs.existsSync(nm)) return [];

  // pnpm: parse .pnpm folder names
  if (pm === "pnpm") {
    const pnpmDir = path.join(nm, ".pnpm");
    if (!fs.existsSync(pnpmDir)) return [];
    const entries = fs.readdirSync(pnpmDir);
    const pkgs = new Set();
    for (const entry of entries) {
      if (entry.startsWith(".")) continue;
      // Format: pkg@version or @scope+pkg@version
      const name = entry.startsWith("@")
        ? entry.replace("+", "/").replace(/@[0-9].*/, "")
        : entry.replace(/@[0-9].*/, "");
      if (name) pkgs.add(name);
    }
    return Array.from(pkgs);
  }

  // npm/yarn: node_modules is flat, just read top-level
  try {
    const entries = fs.readdirSync(nm);
    const pkgs = new Set();
    for (const entry of entries) {
      if (entry.startsWith(".")) continue;
      if (entry.startsWith("@")) {
        const scoped = fs.readdirSync(path.join(nm, entry));
        for (const s of scoped) pkgs.add(`${entry}/${s}`);
      } else {
        pkgs.add(entry);
      }
    }
    return Array.from(pkgs);
  } catch {
    return [];
  }
}

// Remove overrides from package.json
function removeOverrides(dir) {
  const pkgPath = path.join(dir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  let changed = false;

  if (pkg.overrides) { delete pkg.overrides; changed = true; }
  if (pkg.resolutions) { delete pkg.resolutions; changed = true; }
  if (pkg.pnpm?.overrides) { delete pkg.pnpm.overrides; changed = true; }

  if (changed) {
    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  }
  return changed;
}

// Write overrides to package.json
function writeOverrides(dir, pm, replaceable) {
  const pkgPath = path.join(dir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const overrides = {};

  for (const p of replaceable) {
    overrides[p] = `npm:@flupkejs/${p}@^1.0.0`;
  }

  if (pm === "pnpm") {
    pkg.pnpm = pkg.pnpm || {};
    pkg.pnpm.overrides = { ...(pkg.pnpm.overrides || {}), ...overrides };
  } else if (pm === "yarn") {
    pkg.resolutions = { ...(pkg.resolutions || {}), ...overrides };
  } else {
    pkg.overrides = { ...(pkg.overrides || {}), ...overrides };
  }

  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}

// Main entry point
function run() {
  const dir = process.cwd();
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const uninstall = args.includes("--uninstall");
  const numbers = args.includes("--numbers");
  const pkgPath = path.join(dir, "package.json");

  if (!fs.existsSync(pkgPath)) {
    console.error("  No package.json found in current directory.");
    process.exit(1);
  }

  const version = require(path.join(__dirname, "..", "package.json")).version;

  console.log("");
  console.log(`  \x1b[1mflupke\x1b[0m v${version} — dependency cleanup`);
  console.log("");

  if (uninstall) {
    console.log("  Unflupking...");
    console.log("");
    const changed = removeOverrides(dir);
    if (changed) {
      console.log("  \x1b[32m✓\x1b[0m Overrides removed from package.json");
      console.log("");
      console.log(`  \x1b[1mYou have been unflupked. ᕕ( ᐛ )ᕗ\x1b[0m`);
    } else {
      console.log("  No flupke overrides found to remove.");
    }
    console.log("");
    return;
  }

  const pm = detectPackageManager(dir);
  console.log("  Flupking...");
  console.log("");
  const installed = findInstalled(pm, dir);
  const replaceable = REPLACEMENTS.filter((p) => installed.includes(p));

  if (replaceable.length === 0) {
    console.log("  No replaceable packages found.");
    console.log("");
    return;
  }

  if (!dryRun) {
    writeOverrides(dir, pm, replaceable);
  }

  const field = pm === "pnpm" ? "pnpm.overrides" : pm === "yarn" ? "resolutions" : "overrides";
  console.log(`  Scanned:   ${installed.length} packages in dependency tree`);
  console.log(`  Replaced:  ${replaceable.length} packages → @flupkejs/* equivalents`);

  if (numbers) {
    const nm = path.join(dir, "node_modules");
    let nmSize = 0;
    try {
      function dirSize(p) {
        let size = 0;
        const entries = fs.readdirSync(p, { withFileTypes: true });
        for (const entry of entries) {
          const full = path.join(p, entry.name);
          if (entry.isDirectory()) size += dirSize(full);
          else size += fs.statSync(full).size;
        }
        return size;
      }
      nmSize = dirSize(nm);
    } catch {}
    if (nmSize > 0) {
      const mb = (nmSize / 1024 / 1024).toFixed(0);
      console.log(`  Storage:   ${mb} MB in node_modules`);
    }
  }

  console.log("");
  console.log("  Packages replaced:");
  for (const p of replaceable) {
    console.log(`    \x1b[32m✓\x1b[0m ${p}`);
  }
  console.log("");
  if (dryRun) {
    console.log("  \x1b[33m⚠ Dry run — no changes written\x1b[0m");
  } else {
    console.log(`  \x1b[32m✓\x1b[0m ${field} written to package.json`);
    console.log("");
    console.log(`  \x1b[1mYou have been flupked! ᕕ( ᐛ )ᕗ\x1b[0m`);
  }
  console.log("");
  const cmd = pm === "pnpm" ? "pnpm install" : pm === "yarn" ? "yarn install" : "npm install";
  if (!dryRun) console.log(`  Run \x1b[1m${cmd}\x1b[0m to apply.`);
  console.log("");
}

run();
