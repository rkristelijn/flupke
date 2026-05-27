# ADR-014: node:test as Test Framework

## Status

Accepted

## Context

We needed a test framework. Options: Jest, Mocha, Vitest, node:test. Commit `c85de0c` established node:test from the start.

## Decision

Use Node.js built-in `node:test` module with `node:assert/strict`.

## Rationale

- **Zero dependencies** — aligns with our zero-dep philosophy
- **No build step** — `node --test packages/*/test/*.test.js` just works
- **Fast** — no framework overhead, parallel by default
- **Stable** — part of Node.js core, won't be abandoned
- **Coverage built-in** — `--experimental-test-coverage` flag

## Test pattern

```js
const { test } = require("node:test");
const assert = require("node:assert/strict");
const mod = require("../src/index.js");

test("description", () => {
  assert.strictEqual(mod(input), expected);
});
```

## Consequences

- Requires Node.js ≥ 18 (our minimum anyway)
- No snapshot testing (not needed for utility packages)
- No mocking framework (use simple function stubs)
- Coverage reporting requires `--experimental-test-coverage` or c8
