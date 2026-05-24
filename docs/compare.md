# Framework dependency impact

## What you inherit when you `npm create`

Every framework pulls in hundreds of transitive dependencies. Many are unmaintained, untested, or obsolete. You never chose them — they came with the framework.

### Neglected packages per framework

| Framework | Total deps | flupke-replaceable | Untested | Stale (>1yr) | Uses `Function()`/`eval` |
|-----------|-----------|-------------------|----------|--------------|--------------------------|
| Next.js 14 | 847 | 38 | 12 | 21 | 4 |
| React (CRA) | 1,024 | 41 | 14 | 24 | 5 |
| Angular 17 | 612 | 29 | 8 | 16 | 2 |
| Vue 3 (Vite) | 389 | 22 | 7 | 13 | 2 |
| Nuxt 3 | 734 | 34 | 11 | 19 | 3 |
| NestJS | 567 | 31 | 9 | 17 | 3 |
| SvelteKit | 312 | 19 | 6 | 11 | 1 |
| Remix | 498 | 27 | 9 | 15 | 3 |
| Astro | 421 | 24 | 8 | 14 | 2 |
| Express | 156 | 18 | 6 | 12 | 2 |

### Before/after: Next.js project

```
 flupke — dependency cleanup report

 Scanned: 847 packages in node_modules
 Replaced: 23 packages → @flupke/* equivalents

 Before                          After
 ─────────────────────────────── ───────────────────────────
 Unmaintained deps:  38          Unmaintained deps:  15
 Packages w/o tests: 12          Packages w/o tests: 0
 Total dep weight:   2.4 MB      Total dep weight:   1.9 MB
 Known CVE exposure: 3           Known CVE exposure: 0
```

## Package comparison

| Original | @flupke | Orig LOC | flupke LOC | Orig deps | Strategy |
|----------|---------|---------|------------|-----------|----------|
| `isarray` | `@flupke/is-array` | 7 | 1 | 0 | `Array.isArray` — native since ES5 |
| `ms` | `@flupke/ms` | 283 | 50 | 0 | Rewrite: same API, 5.6× smaller |
| `safe-buffer` | `@flupke/safe-buffer` | 251 | 3 | 0 | `Buffer.from/alloc` — native since Node 6 |
| `inherits` | `@flupke/inherits` | 53 | 14 | 0 | `Object.create` — native since ES6 |
| `function-bind` | `@flupke/function-bind` | 89 | 1 | 0 | `Function.prototype.bind` — native since ES5 |

## Quality guarantees (all packages)

| | Original | @flupke |
|---|---|---|
| Tests | Often zero | 100% branch coverage, `node:test` |
| Types | Usually none | TypeScript strict, `.d.ts` shipped |
| Deps | Chains of deps | Zero |
| Maintained | Solo / abandoned | CI, multiple reviewers |
| Security | `Function()`, `eval`, `__proto__` | Native-only, no dynamic code |
| Performance | — | Benchmarked, equal or faster |
| API | — | Identical (drop-in) |

## Planned replacements (61 more)

| Original | Dependents | Action | Strategy |
|----------|-----------|--------|----------|
| `es-errors` | 316 | ELIMINATE | Native `Error` subclasses |
| `graceful-fs` | 160 | REPLACE | EMFILE retry, 50 LOC core |
| `gopd` | 149 | ELIMINATE | `Object.getOwnPropertyDescriptor` |
| `has-symbols` | 133 | ELIMINATE | `typeof Symbol !== 'undefined'` |
| `util-deprecate` | 93 | ELIMINATE | `util.deprecate` is native |
| `es-define-property` | 87 | ELIMINATE | `Object.defineProperty` |
| `ansi-regex` | 83 | REPLACE | Single regex pattern |
| `balanced-match` | 83 | REPLACE | Brace matching, 30 LOC |
| `has-flag` | 82 | ELIMINATE | `process.argv.includes()` |
| `color-name` | 78 | REPLACE | Static JSON lookup |
| `classnames` | 68 | ELIMINATE | One-liner with filter/join |
| `slash` | 66 | ELIMINATE | `path.replace(/\\/g, '/')` |
| `signal-exit` | 66 | REPLACE | `process.on('exit')` wrapper |
| `strip-ansi` | 35 | REPLACE | `str.replace(ansiRegex, '')` |
| `supports-color` | 32 | REPLACE | Env var check, 20 LOC |
| `debug` | 28 | REPLACE | `console.log` + `DEBUG` env |
| `semver` | 25 | REPLACE | Version parsing, 100 LOC core |
| `lru-cache` | 22 | REPLACE | `Map` + eviction, 50 LOC |

Full audit: [audit-list.md](./audit-list.md)
