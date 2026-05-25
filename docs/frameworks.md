# Framework compatibility

Tested against 20 popular frameworks. Results from `npx @flupkejs/cli --dry-run`.

## Results

| Framework | Deps scanned | Replaceable | Coverage |
|-----------|-------------|-------------|----------|
| nuxt | 404 | 61 | 15% |
| jest | 182 | 54 | 30% |
| nestjs | 91 | 44 | 48% |
| mocha | 71 | 34 | 48% |
| express | 65 | 42 | 65% |
| eslint | 53 | 14 | 26% |
| webpack | 45 | 5 | 11% |
| fastify | 39 | 4 | 10% |
| koa | 30 | 17 | 57% |
| axios | 27 | 11 | 41% |
| typeorm | 25 | 13 | 52% |
| winston | 24 | 7 | 29% |
| socket.io | 18 | 6 | 33% |
| next | 16 | 2 | 13% |
| mongoose | 15 | 1 | 7% |
| vite | 12 | 1 | 8% |
| hapi | 0 | 0 | — |
| commander | 0 | 0 | — |
| esbuild | 0 | 0 | — |
| prisma | 0 | 0 | — |

## Integration tested

Full integration tests (install → flupke → verify features):

| Framework | Features verified |
|-----------|-------------------|
| Express | GET, POST JSON, POST urlencoded, params, content negotiation, cookies, etag, error handling |
| NestJS | GET, POST, params, error handling |
| Next.js | Production build |

## Performance vs originals

| Package | Δ vs original |
|---------|---------------|
| ipaddr.js (isValid) | +1507% |
| ipaddr.js (parse) | +186% |
| path-to-regexp (match) | +105% |
| ipaddr.js (range) | +59% |
| negotiator | +46% |
| ms (parse) | +19% |
| path-to-regexp (compile) | +9% |
| inherits | +5% |
| ms (format) | +3% |
| function-bind | +2% |
| safe-buffer | +1% |

All packages equal or faster than originals.

## Zero-dep frameworks

These frameworks have no replaceable transitive deps (already lean or use only scoped packages):
- hapi, commander, esbuild, prisma
