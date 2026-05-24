# Contributing to flupke

## Adding a new package

1. Create `packages/<name>/src/index.js` — the implementation
2. Create `packages/<name>/src/index.d.ts` — TypeScript types
3. Create `packages/<name>/package.json` — with `"exports"` field
4. Create `packages/<name>/test/index.test.js` — using `node:test`
5. Add the package name to `packages/cli/src/index.js` REPLACEMENTS array

## Rules

- Zero dependencies per package
- Same API as the original (drop-in)
- Native-first: use platform features
- TypeScript strict types
- 100% branch coverage in tests
- No `eval()`, `Function()`, `with`, or `__proto__`

## Running tests

```bash
node --test packages/*/test/*.test.js
```

## Running benchmarks

```bash
node bench/compare-isolated.js
```
