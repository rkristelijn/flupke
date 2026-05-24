# flupke

One command. Safer dependencies.

```bash
npx @flupke/cli
```

## The problem

You `npm create next-app` and get 50+ unmaintained packages you never asked for:

| Framework | Neglected deps in tree | Untested | Stale (>1yr) |
|-----------|----------------------|----------|--------------|
| Next.js | 38 | 12 | 21 |
| React (CRA) | 41 | 14 | 24 |
| Angular | 29 | 8 | 16 |
| Vue (Vite) | 22 | 7 | 13 |
| Nuxt | 34 | 11 | 19 |
| NestJS | 31 | 9 | 17 |
| SvelteKit | 19 | 6 | 11 |
| Remix | 27 | 9 | 15 |

These are packages like `safe-buffer` (untouched 5.5 years), `function-bind` (uses `Function()` constructor), `es-errors` (zero tests). You don't see them. You don't choose them. But they're in your production bundle.

## The fix

```bash
npx @flupke/cli
```

That's it. Works with npm, yarn, and pnpm. Scans your lockfile, finds replaceable packages, adds overrides, shows a before/after report:

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

 Overrides written to package.json ✓
 Run `npm install` to apply.
```

## What @flupke packages guarantee

| | Original | @flupke |
|---|---|---|
| Tests | Often zero | 100% branch coverage |
| Types | Usually none | TypeScript strict |
| Deps | Chains of deps | Zero |
| Maintained | Solo / abandoned | CI, multiple reviewers |
| Security | `Function()`, `eval` | Native-only, no dynamic code |
| API | — | Identical (drop-in) |

## Package managers

```bash
# npm
npx @flupke/cli

# yarn
yarn dlx @flupke/cli

# pnpm
pnpm dlx @flupke/cli
```

All three generate the correct override format (`overrides`, `resolutions`, or `pnpm.overrides`).

## Current replacements

| Original | flupke LOC | Strategy |
|----------|-----------|----------|
| `isarray` (7 LOC) | 1 | `Array.isArray` — native since ES5 |
| `ms` (283 LOC) | 50 | Rewrite: same API, 5.6× smaller |
| `safe-buffer` (251 LOC) | 3 | `Buffer.from/alloc` — native since Node 6 |
| `inherits` (53 LOC) | 14 | `Object.create` — native since ES6 |
| `function-bind` (89 LOC) | 1 | `Function.prototype.bind` — native since ES5 |

61 more planned — see [docs/compare.md](docs/compare.md) for the full list.

## Philosophy

- **You shouldn't have to audit your framework's transitive deps** — flupke does it for you
- **One command** — no config, no migration, no breaking changes
- **Native first** — if the platform has it, use it
- **Same API** — your code doesn't change, only what's underneath

## License

MIT
