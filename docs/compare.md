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
 Replaced: 23 packages → @flupkejs/* equivalents

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
| `isarray` | `@flupkejs/is-array` | 7 | 1 | 0 | `Array.isArray` — native since ES5 |
| `ms` | `@flupkejs/ms` | 283 | 50 | 0 | Rewrite: same API, 5.6× smaller |
| `safe-buffer` | `@flupkejs/safe-buffer` | 251 | 3 | 0 | `Buffer.from/alloc` — native since Node 6 |
| `inherits` | `@flupkejs/inherits` | 53 | 14 | 0 | `Object.create` — native since ES6 |
| `function-bind` | `@flupkejs/function-bind` | 89 | 1 | 0 | `Function.prototype.bind` — native since ES5 |

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

## All 100 packages implemented

See [catalog.md](./catalog.md) for the full list with LOC, tests, and dependents per package.

Full audit: [audit-list.md](./audit-list.md)
