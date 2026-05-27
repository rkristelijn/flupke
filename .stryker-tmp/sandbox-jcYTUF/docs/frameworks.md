# Framework compatibility

153 packages. 722 tests. CI-verified against 50 frameworks.

## CI Integration Matrix — 44/50 passing ✓

### ✅ Passing (44 frameworks)

| Category | Frameworks |
|----------|-----------|
| **Tier S** | react-vite, next, angular, vue, nuxt, svelte, sveltekit, solid, astro |
| **Tier A** | qwik, remix, expo, react-native, electron, tauri, hono |
| **Tier A/B** | preact, lit, stencil |
| **Backend** | express, fastify, hapi |
| **HTTP** | axios |
| **Testing** | jest, mocha, vitest, playwright |
| **Bundlers** | webpack, vite, esbuild, rollup |
| **Tooling** | prettier, tailwindcss |
| **Data** | mongoose, typeorm, prisma, graphql, trpc, zod |
| **Utils** | lodash, dotenv, commander |
| **Legacy** | ember |

### ❌ Known failures (6 — tracked for next iteration)

| Framework | Root cause |
|-----------|-----------|
| nestjs | `define-data-property` edge case |
| koa | `toidentifier` called with non-string from http-errors |
| eslint | `lru-cache` property access pattern |
| socket.io | same as nestjs (shared dep tree) |
| winston | `triple-beam` Symbol.for mismatch |
| jquery | jsdom integration (not flupke-related) |

## Replaceable packages per framework

| Framework | Deps | Replaceable | Coverage |
|-----------|------|-------------|----------|
| express | 65 | 42 | **65%** |
| nuxt | 404 | 61 | 15% |
| jest | 182 | 54 | 30% |
| nestjs | 91 | 44 | 48% |
| axios | 76 | 43 | 57% |
| mocha | 71 | 34 | 48% |
| webpack | 81 | 18 | 22% |
| koa | 30 | 17 | 57% |
| eslint | 53 | 14 | 26% |
| astro | — | 13 | — |
| remix | — | 13 | — |
| solid | — | 7 | — |
| winston | 24 | 7 | 29% |
| socket.io | 18 | 6 | 33% |
| fastify | 41 | 4 | 10% |
| svelte | — | 3 | — |
| next | 16 | 2 | 13% |

## Performance vs originals

All packages benchmarked equal or faster:

| Package | Δ vs original |
|---------|---------------|
| ipaddr.js (isValid) | **+1507%** |
| ipaddr.js (parse) | **+186%** |
| path-to-regexp (match) | **+105%** |
| ipaddr.js (range) | **+59%** |
| negotiator | **+46%** |
| ms (parse) | **+19%** |
| path-to-regexp (compile) | **+9%** |
| inherits | **+5%** |
| ms (format) | **+3%** |
| function-bind | **+2%** |

## Quality gates

| Layer | Tool | Status |
|-------|------|--------|
| Types | 146 `.d.ts` files | ✓ |
| Tests | 698 tests, node:test | ✓ 0 failures |
| Mutation | Stryker (ipaddr 100%, ms 77%, qs 77%) | ✓ |
| Integration | 50 frameworks in CI | ✓ 44/50 |
| Static | Biome + Semgrep + SonarCloud | ✓ |
| Performance | Benchmarks vs originals | ✓ all faster |
| Git | Conventional commits + scope validation | ✓ |
