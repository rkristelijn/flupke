# flupke

Foundational Libraries Under Packages Known & Established.

Hardened, tested, maintained drop-in replacements for neglected npm leaf packages.

## Why

The bottom of the npm dependency tree is held together by solo-maintained, untested, abandoned packages. `safe-buffer` hasn't been touched in 5.5 years. `es-errors` has zero tests. `function-bind` uses `Function()` constructor. These packages have 100-300+ dependents each.

flupke replaces them with:
- Same API (adapter pattern, drop-in)
- TypeScript (strict mode, full types)
- 100% test coverage
- Benchmarked (faster or equal)
- Multiple maintainers
- CI/CD on every commit
- cpm level 5 maturity

## Install

Replace neglected packages in your project with one command:

```bash
# Generate overrides for your package.json
npx @flupke/cli override

# Or manually:
npm install @flupke/safe-buffer @flupke/ms @flupke/inherits
```

Then add to your `package.json`:

```json
{
  "overrides": {
    "safe-buffer": "npm:@flupke/safe-buffer@^1.0.0",
    "inherits": "npm:@flupke/inherits@^1.0.0",
    "ms": "npm:@flupke/ms@^1.0.0",
    "isarray": "npm:@flupke/is-array@^1.0.0",
    "function-bind": "npm:@flupke/function-bind@^1.0.0"
  }
}
```

## Packages

| Package | Replaces | Status | Original |
|---------|----------|--------|----------|
| `@flupke/is-array` | `isarray` | ✓ | 87 dependents, native since ES5 |
| `@flupke/inherits` | `inherits` | ✓ | 159 dependents, native since ES6 |
| `@flupke/safe-buffer` | `safe-buffer` | ✓ | 140 dependents, native since Node 6 |
| `@flupke/ms` | `ms` | ✓ | 99 dependents, solo maintainer |
| `@flupke/function-bind` | `function-bind` | ✓ | 92 dependents, uses Function() |

## Philosophy

- **Same API** — drop-in, no migration needed
- **Native first** — use platform features, polyfill nothing that exists
- **Zero deps** — each package has zero dependencies
- **Fast** — benchmarked against originals, equal or faster
- **Strict** — TypeScript strict mode, no any, no implicit
- **Tested** — 100% branch coverage, property-based tests
- **Maintained** — CI, multiple reviewers, security policy

## License

MIT
