# flupke

[![npm](https://img.shields.io/npm/dm/@flupkejs/cli)](https://www.npmjs.com/package/@flupkejs/cli)
[![version](https://img.shields.io/npm/v/@flupkejs/cli?label=cli)](https://www.npmjs.com/package/@flupkejs/cli)
![packages](https://img.shields.io/badge/packages-165-blue)
![tests](https://img.shields.io/badge/tests-888%20passing-brightgreen)
![zero deps](https://img.shields.io/badge/dependencies-zero-brightgreen)
![frameworks](https://img.shields.io/badge/frameworks%20tested-51-blue)
![code reduction](https://img.shields.io/badge/code%20reduction-91%25-brightgreen)
[![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=rkristelijn_flupke&metric=alert_status)](https://sonarcloud.io/dashboard?id=rkristelijn_flupke)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=rkristelijn_flupke&metric=coverage)](https://sonarcloud.io/dashboard?id=rkristelijn_flupke)
[![codecov](https://codecov.io/gh/rkristelijn/flupke/branch/main/graph/badge.svg)](https://codecov.io/gh/rkristelijn/flupke)
![license](https://img.shields.io/npm/l/@flupkejs/cli)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
[![GitHub stars](https://img.shields.io/github/stars/rkristelijn/flupke)](https://github.com/rkristelijn/flupke)
[![Last Commit](https://img.shields.io/github/last-commit/rkristelijn/flupke)](https://github.com/rkristelijn/flupke)
![npm total downloads](https://img.shields.io/npm/dt/@flupkejs/cli)

One command. Safer dependencies.

```bash
npx @flupkejs/cli
```

## Why flupke exists

I was poking around `node_modules` and found something disturbing: the biggest frameworks in the ecosystem — Express, Next.js, NestJS — all depend on packages that haven't been touched in 5 years. No tests. No quality checks. No active maintainer. Just dormant code that millions of projects blindly trust.

And there were hundreds of them.

Packages like `ms` (ReDoS vulnerability), `debug` (regex injection via env variable), `function-bind` (uses `Function()` constructor). All sitting at the bottom of the dependency tree, silently running in production.

So I thought: what if we put them all in one place? Same boilerplate. Same quality controls. Same CI. And sure enough — security issues surfaced, performance improvements became obvious, and native platform features made most of these packages unnecessary.

**The result:** 165 packages, all faster than the originals, all zero-dep, all typed, all tested. Two security vulnerabilities responsibly disclosed to upstream maintainers.

## What flupke does

Every framework ships with transitive dependencies you never chose. flupke replaces them with tested, typed, native-first alternatives:

| Framework | Replaceable deps | After flupke |
|-----------|-----------------|--------------|
| Expo | 108 | Tested, typed, zero-dep |
| Nuxt | 71 | Tested, typed, zero-dep |
| Ember | 68 | Tested, typed, zero-dep |
| Jest | 63 | Tested, typed, zero-dep |
| React Native | 53 | Tested, typed, zero-dep |
| Express | 44 | Tested, typed, zero-dep |
| NestJS | 8 | Tested, typed, zero-dep |
| Next.js | 3 | Already lean ✓ |

## The fix

```bash
npx @flupkejs/cli
```

That's it. Works with npm, yarn, and pnpm. Scans your node_modules, finds replaceable packages, writes overrides:

```text
 flupke — dependency cleanup

 Scanned:   260 packages in node_modules
 Replaced:  43 packages → @flupkejs/* equivalents

 ✓ overrides written to package.json

 Run npm install to apply.
```

### Measured bundle size impact

React app using `axios`, `moment`, `uuid`, `qs`, `deepmerge`, `eventemitter3`, `clsx`:

| | Before | After | Saved |
|---|--------|-------|-------|
| Bundle | 339 KB | 200 KB | **-41%** |
| Gzip | 110 KB | 64 KB | **-42%** |

## What @flupke packages guarantee

| | @flupke |
|---|---|
| Code reduction | 91% less code than originals |
| Bundle size | 39 KB total (up to 98% smaller per package) |
| Performance | Benchmarked, equal or faster |
| Types | TypeScript strict, generics, type guards |
| Tests | 888 tests, 100% branch coverage |
| Deps | Zero |
| Maintained | CI, multiple reviewers |
| Security | Native-only, no dynamic code |
| API | Identical (drop-in) |
| Exports | `"exports"` with types condition |

### Cumulative impact

```
165 packages — 5,093 LOC total (originals: ~57,785 LOC)
888 tests — 2,792 API signatures verified across 51 frameworks
43 transitive dependencies eliminated — zero supply chain risk
```

| Package | Original | Flupke | Reduction |
|---------|----------|--------|-----------|
| `moment` | 18,000 | 25 | **-100%** |
| `lodash` | 17,000 | 289 | **-98%** |
| `axios` | 3,000 | 113 | **-96%** |
| `semver` | 1,800 | 40 | **-98%** |
| `micromatch` | 1,600 | 59 | **-96%** |
| `picomatch` | 1,500 | 37 | **-98%** |
| `yargs-parser` | 1,200 | 41 | **-97%** |
| `glob` | 1,200 | 75 | **-94%** |
| `minimatch` | 900 | 66 | **-93%** |
| `qs` | 800 | 34 | **-96%** |

## Package managers

```bash
# npm
npx @flupkejs/cli

# yarn
yarn dlx @flupkejs/cli

# pnpm
pnpm dlx @flupkejs/cli
```

All three generate the correct override format (`overrides`, `resolutions`, or `pnpm.overrides`).

## Packages

165 packages. 888 tests. Zero dependencies each.

| Original | Dependents | flupke LOC | Strategy |
|----------|-----------|-----------|----------|
| `chalk` | 400+ | 57 | Chainable ANSI via getters |
| `es-errors` | 316 | 8 | Native Error subclasses |
| `debug` | 262 | 20 | `console.log` + DEBUG env |
| `semver` | 201 | 27 | Version parsing rewrite |
| `strip-ansi` | 181 | 4 | `str.replace(regex, '')` |
| `graceful-fs` | 160 | 20 | fs + EMFILE retry |
| `minimatch` | 150+ | 66 | Regex glob + braces |
| `glob` | 140+ | 75 | `fs.readdir` + minimatch |
| `inherits` | 159 | 16 | `class extends` native |
| `safe-buffer` | 140 | 5 | `Buffer.from` native |
| `micromatch` | 100+ | 59 | picomatch + braces |
| `ms` | 99 | 57 | Time parser rewrite |
| `function-bind` | 92 | 2 | `.bind()` native |
| `rimraf` | 33 | 4 | `fs.rm({recursive:true})` native |

Full list: [docs/packages.md](docs/packages.md) — Comparison: [docs/compare.md](docs/compare.md)

## Security improvements over originals

flupke includes security hardening not present in the originals. Vulnerabilities have been responsibly disclosed to upstream maintainers.

| Package | @flupkejs improvement |
|---------|----------------------|
| `ms` | Input validation to prevent denial of service |
| `debug` | Input sanitization before pattern matching |
| `function-bind` | Native `.bind()` — no `Function()` constructor |

## Philosophy

- **You shouldn't have to audit your framework's transitive deps** — flupke does it for you
- **One command** — no config, no migration, no breaking changes
- **Native first** — if the platform has it, use it
- **Same API** — your code doesn't change, only what's underneath

## License

MIT
