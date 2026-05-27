# ADR-009: var→let/const and Modern JS Patterns

## Status

Accepted

## Context

Commits `4fdd0c2`, `22018bb`, `d4da9ab`, `f49f170` systematically modernized all code. SonarCloud flagged `var` as critical.

## Decision

Enforce modern JavaScript patterns across all packages:

- `let`/`const` over `var` (block scoping, no hoisting bugs)
- `for...of` over `forEach` (performance, break/continue, async-safe)
- `.replaceAll()` over `.replace(/x/g)` (clarity)
- Optional chaining `?.` over `&&` guards (conciseness)
- Template literals over string concatenation
- Arrow functions where `this` binding not needed

## Enforcement

- Biome lint + format on all code
- `checks/check-code-smells.js` detects regressions
- SonarCloud quality gate

## Rationale

- **Performance** — `for...of` avoids closure overhead of `forEach`
- **Safety** — `const` prevents accidental reassignment, block scoping prevents leaks
- **Readability** — modern patterns are more concise
- **Engine optimization** — V8 optimizes modern patterns better

## Consequences

- Requires Node.js ≥ 18 (already our minimum)
- All PRs must pass Biome check
