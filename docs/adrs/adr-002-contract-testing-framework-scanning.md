# ADR-002: Contract Testing via Framework API Surface Scanning

## Status

Proposed

## Context

flupke claims "identical API — drop-in replacement" for 153 packages. Currently this is validated by:
- Manual API review against original docs
- Unit tests written by us
- Bundle size + benchmark comparisons

This is insufficient. We don't know *exactly* how Express, NestJS, Jest, Nuxt etc. call these packages in practice. Edge cases, undocumented behavior, and unusual argument combinations may break silently.

## Decision

Build an automated pipeline that:

1. **Scans top frameworks** to extract real call signatures of packages we replace
2. **Generates contract tests** from those call sites
3. **Runs contract tests** against @flupkejs/* packages on every release
4. **Monitors downstream** — periodically tests top dependents with our overrides

## Design

### Phase 1: API Surface Extraction

```
Input:  express/node_modules/ms (source code)
Output: [{fn: "ms", args: ["2 days"], returns: "number"},
         {fn: "ms", args: [60000, {long: true}], returns: "string"}]
```

Approach:
- Clone framework repos (Express, NestJS, Jest, Nuxt, etc.)
- For each flupke-replaceable package, find all `require()`/`import` sites
- Extract call expressions via AST (not regex — need argument types)
- Deduplicate into unique call signatures

Tools: `@babel/parser` or `ts-morph` for AST, `jscodeshift` for traversal.

### Phase 2: Contract Test Generation

For each extracted call signature, generate a test:

```js
// Generated from: express/lib/response.js:42
test("ms('2 days') returns 172800000 (express compat)", () => {
  const ms = require('@flupkejs/ms');
  assert.strictEqual(ms('2 days'), 172800000);
});
```

Output: `packages/ms/test/contract.test.js` (auto-generated, gitignored or committed)

### Phase 3: Ecosystem CI

On every flupke release:
1. Clone top-5 frameworks
2. Apply `npx @flupkejs/cli` overrides
3. Run their test suites
4. Report pass/fail per framework

```
┌─────────────────────────────────────────┐
│ Ecosystem CI Results                    │
├──────────┬──────┬───────┬──────────────┤
│ Framework│Tests │Status │ Broken pkgs  │
├──────────┼──────┼───────┼──────────────┤
│ Express  │ 1847 │ PASS  │ —            │
│ NestJS   │ 3201 │ PASS  │ —            │
│ Jest     │ 8442 │ FAIL  │ graceful-fs  │
│ Nuxt     │ 2103 │ PASS  │ —            │
└──────────┴──────┴───────┴──────────────┘
```

### Phase 4: Downstream Monitoring

- Track npm download stats for @flupkejs/* packages
- GitHub dependents: who uses us?
- Periodic: clone top-N dependents, run their tests with our overrides
- Alert on breakage before users report it

## Target Frameworks

| Framework | Priority | Replaceable deps | Why |
|-----------|----------|-----------------|-----|
| Express | P0 | 42 | Most popular, most leaf deps |
| NestJS | P0 | 44 | Enterprise adoption |
| Jest | P1 | 54 | Dev tooling, wide reach |
| Nuxt | P1 | 61 | Vue ecosystem |
| Next.js | P2 | 2 | Already lean |

## File Structure

```
scripts/
  extract-api-surface.js    # Phase 1: scan frameworks
  generate-contracts.js     # Phase 2: generate tests
  ecosystem-ci.sh           # Phase 3: run framework tests

packages/*/test/
  contract.test.js          # Generated contract tests (per package)

.github/workflows/
  ecosystem-ci.yml          # Weekly: run against top frameworks
```

## Risks

| Risk | Mitigation |
|------|-----------|
| Framework internals change | Pin versions, re-scan monthly |
| AST extraction misses dynamic calls | Supplement with runtime tracing |
| Test generation produces false positives | Manual review + baseline |
| Ecosystem CI is slow | Parallelize, cache node_modules |
| Frameworks use undocumented behavior | Document as "compat notes" per package |

## Success Criteria

- 100% of call signatures used by Express/NestJS pass against @flupkejs/*
- Ecosystem CI runs weekly, green for all P0 frameworks
- Contract tests auto-generated, no manual maintenance
- Breakage detected before npm publish

## Consequences

- **Positive**: Provable drop-in compatibility, not just claimed
- **Positive**: Foundation for upstream MRs ("here's proof our replacement works")
- **Positive**: Marketing: "tested against Express, NestJS, Jest, Nuxt"
- **Negative**: CI cost (framework test suites are large)
- **Negative**: Maintenance of extraction tooling

## Future: Upstream MRs

Once we have proven compatibility + performance data, we can submit PRs to frameworks:
- "Replace `ms` with `@flupkejs/ms` — same API, 95% smaller, typed, maintained"
- Include: contract test results, benchmark data, security improvements
- This positions flupke as infrastructure, not just an alternative
