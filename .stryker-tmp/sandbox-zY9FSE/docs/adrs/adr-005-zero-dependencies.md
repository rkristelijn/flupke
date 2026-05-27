# ADR-005: Zero Dependencies Per Package

## Status

Accepted

## Context

The original packages we replace often have transitive dependencies themselves (e.g., `chalk` → `ansi-styles` → `color-convert` → `color-name`). This creates supply chain risk and bloat.

## Decision

Every flupke package has exactly zero runtime dependencies. No exceptions.

## Rationale

- **Supply chain security** — no transitive attack surface
- **Bundle size** — what you see is what you get
- **Auditability** — one file to review per package
- **No version conflicts** — no diamond dependency problems
- **Predictable** — no surprise updates from transitive deps

## Implementation

- Internal code sharing via relative `require("../../other/src/index.js")` between packages in the monorepo
- Published packages are standalone (no workspace references)
- CI check: `package.json` must not have `dependencies` field

## Consequences

- Some code duplication between packages (acceptable given small size)
- Internal packages can reference each other for development but publish independently
