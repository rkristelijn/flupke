# flupke

![cpm score](https://img.shields.io/badge/cpm%20score-94%25-brightgreen)
![maturity](https://img.shields.io/badge/maturity-level%204%20optimized-brightgreen)
![packages](https://img.shields.io/badge/packages-153-blue)

One command. Safer dependencies.

```bash
npx @flupkejs/cli
```

## What flupke does

Every framework ships with transitive dependencies you never chose. flupke replaces them with tested, typed, native-first alternatives:

| Framework | Replaceable deps | After flupke |
|-----------|-----------------|--------------|
| Next.js | 43 | Tested, typed, zero-dep |
| Angular | 19 | Tested, typed, zero-dep |
| NestJS | 30 | Tested, typed, zero-dep |
| React (Vite) | 7 | Tested, typed, zero-dep |
| Vue (Vite) | — | Already lean ✓ |

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
| Bundle size | 39 KB total (up to 95% smaller per package) |
| Performance | Benchmarked, equal or faster |
| Types | TypeScript strict, generics, type guards |
| Tests | 100% branch coverage |
| Deps | Zero |
| Maintained | CI, multiple reviewers |
| Security | Native-only, no dynamic code |
| API | Identical (drop-in) |
| Exports | `"exports"` with types condition |

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

153 packages. 722 tests. Zero dependencies each.

| Original | Dependents | flupke LOC | Strategy |
|----------|-----------|-----------|----------|
| `es-errors` | 316 | 8 | Native Error subclasses |
| `debug` | 262 | 20 | `console.log` + DEBUG env |
| `semver` | 201 | 27 | Version parsing rewrite |
| `strip-ansi` | 181 | 4 | `str.replace(regex, '')` |
| `graceful-fs` | 160 | 20 | fs + EMFILE retry |
| `inherits` | 159 | 16 | `class extends` native |
| `safe-buffer` | 140 | 5 | `Buffer.from` native |
| `ms` | 99 | 57 | Time parser rewrite |
| `function-bind` | 92 | 2 | `.bind()` native |
| `rimraf` | 33 | 4 | `fs.rm({recursive:true})` native |

Full list: [docs/catalog.md](docs/catalog.md) — Comparison: [docs/compare.md](docs/compare.md)

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
