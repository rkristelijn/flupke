# ADR-004: Plain JavaScript + Handwritten .d.ts (No TypeScript Source)

## Status

Accepted

## Context

Most modern packages ship TypeScript source. We chose not to.

## Decision

All packages are plain JavaScript with handwritten `.d.ts` type declarations.

## Rationale

- **No build step** — source runs directly, no `tsc` compilation needed
- **Smaller publish** — no `dist/`, no source maps, no `tsconfig.json`
- **Industry standard** — how `react`, `express`, `lodash`, `axios` ship types
- **No runtime difference** — TypeScript compiles away, the output is identical
- **Faster CI** — no compilation step, tests run directly on source

## Consequences

- Types must be manually kept in sync with implementation
- No type-level bugs caught at authoring time (mitigated by tests)
- Simpler package structure: `src/index.js` + `src/index.d.ts`
