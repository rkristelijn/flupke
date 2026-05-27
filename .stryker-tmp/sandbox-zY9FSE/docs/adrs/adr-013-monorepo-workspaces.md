# ADR-013: Monorepo with Workspace Packages

## Status

Accepted

## Context

Initial commit `ad6f988` established the monorepo structure. Each package is independent but shares tooling.

## Decision

Use npm workspaces with one package per directory:

```
packages/
  <name>/
    src/index.js      — implementation
    src/index.d.ts    — types
    test/index.test.js — tests
    package.json      — exports field
```

## Rationale

- **Consistency** — same structure everywhere, easy to add new packages
- **Shared tooling** — one `node --test`, one Biome config, one CI
- **Independent publishing** — each package has its own version and npm entry
- **Atomic PRs** — can add/fix one package without touching others

## Publishing

Each package publishes as `@flupkejs/<name>` to npm. The CLI maps original names to flupke equivalents.

## Consequences

- Must maintain 165+ `package.json` files
- Workspace hoisting means internal `require("../../other/src")` works in dev but not in published form
- Published packages must be self-contained (enforced by zero-dep rule)
