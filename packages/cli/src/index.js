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

// List all installed packages in node_modules
function findInstalled(dir) {
  const nm = path.join(dir, "node_modules");
  if (!fs.existsSync(nm)) return [];
  return fs
    .readdirSync(nm)
    .filter((f) => !f.startsWith(".") && !f.startsWith("@"));
}

// Filter installed packages against known replacements
function findReplaceable(installed) {
  return REPLACEMENTS.filter((p) => installed.includes(p));
}

// Write overrides to package.json in the correct format per package manager
function writeOverrides(dir, pm, replaceable) {
  const pkgPath = path.join(dir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const directDeps = Object.keys(pkg.dependencies || {});
  const devDeps = Object.keys(pkg.devDependencies || {});
  const overrides = {};

  for (const p of replaceable) {
    const alias = `npm:@flupkejs/${p}@^1.0.0`;
    if (directDeps.includes(p)) {
      pkg.dependencies[p] = alias;
    } else if (devDeps.includes(p)) {
      pkg.devDependencies[p] = alias;
    } else {
      overrides[p] = alias;
    }
  }

  if (Object.keys(overrides).length > 0) {
    if (pm === "pnpm") {
      pkg.pnpm = pkg.pnpm || {};
      pkg.pnpm.overrides = { ...(pkg.pnpm.overrides || {}), ...overrides };
    } else if (pm === "yarn") {
      pkg.resolutions = { ...(pkg.resolutions || {}), ...overrides };
    } else {
      pkg.overrides = { ...(pkg.overrides || {}), ...overrides };
    }
  }

  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}

// Known bundle sizes (gzip KB) of originals vs flupke
const SIZES = {
  axios: [13.4, 1.2],
  moment: [72.0, 7.0],
  lodash: [25.0, 3.2],
  uuid: [3.0, 0.1],
  qs: [8.0, 0.3],
  deepmerge: [2.0, 0.4],
  eventemitter3: [3.0, 0.5],
  classnames: [0.3, 0.2],
  clsx: [0.3, 0.2],
  dotenv: [2.5, 0.5],
  cookie: [1.5, 0.3],
  "escape-html": [0.3, 0.2],
};

// Main entry point
function run() {
  const dir = process.cwd();
  const args = process.argv.slice(2);
  const analyze = args.includes("--analyze");
  const dryRun = args.includes("--dry-run");
  const pkgPath = path.join(dir, "package.json");

  if (!fs.existsSync(pkgPath)) {
    console.error("  No package.json found in current directory.");
    process.exit(1);
  }

  const pm = detectPackageManager(dir);
  const installed = findInstalled(dir);
  const replaceable = findReplaceable(installed);

  // Header
  console.log("");
  console.log("  \x1b[1mflupke\x1b[0m — dependency cleanup");
  console.log("");

  if (replaceable.length === 0) {
    console.log("  No replaceable packages found.");
    console.log("");
    return;
  }

  // Before stats
  const totalPkgs = installed.length;

  // Write overrides (unless dry-run)
  if (!dryRun) {
    writeOverrides(dir, pm, replaceable);
  }

  // Report
  const field =
    pm === "pnpm"
      ? "pnpm.overrides"
      : pm === "yarn"
        ? "resolutions"
        : "overrides";
  console.log(`  Scanned:   ${totalPkgs} packages in node_modules`);
  console.log(
    `  Replaced:  ${replaceable.length} packages → @flupkejs/* equivalents`,
  );
  console.log("");

  // Bundle size analysis
  if (analyze || replaceable.some((p) => SIZES[p])) {
    let savedKB = 0;
    let beforeKB = 0;
    console.log("  Bundle impact (gzip):");
    for (const p of replaceable) {
      if (SIZES[p]) {
        const [orig, flup] = SIZES[p];
        savedKB += orig - flup;
        beforeKB += orig;
        console.log(
          `    ${p}: ${orig} KB → ${flup} KB (\x1b[32m-${(orig - flup).toFixed(1)} KB\x1b[0m)`,
        );
      }
    }
    if (savedKB > 0) {
      console.log("");
      console.log(
        `  \x1b[1mTotal bundle savings: -${savedKB.toFixed(1)} KB gzip\x1b[0m`,
      );
    }
    console.log("");
  }

  console.log("  Packages replaced:");
  for (const p of replaceable) {
    console.log(`    ✓ ${p}`);
  }
  console.log("");
  if (dryRun) {
    console.log("  \x1b[33m⚠ Dry run — no changes written\x1b[0m");
  } else {
    console.log(`  \x1b[32m✓\x1b[0m ${field} written to package.json`);
  }
  console.log("");
  const cmd =
    pm === "pnpm"
      ? "pnpm install"
      : pm === "yarn"
        ? "yarn install"
        : "npm install";
  if (!dryRun) console.log(`  Run \x1b[1m${cmd}\x1b[0m to apply.`);
  console.log("");
}

run();
