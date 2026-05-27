# ADR-008: npm Overrides as Distribution Mechanism

## Status

Accepted

## Context

We need a way to replace packages in existing projects without forking frameworks or changing application code. Commit `24c883f` introduced the CLI.

## Decision

Use npm/yarn/pnpm override mechanisms to swap packages at install time:

```bash
npx @flupkejs/cli
```

Generates the correct format per package manager:
- npm: `overrides` in package.json
- yarn: `resolutions` in package.json
- pnpm: `pnpm.overrides` in package.json

## Rationale

- **Zero code changes** — application code stays identical
- **One command** — no migration, no config
- **Reversible** — remove overrides and `npm install` to revert
- **Framework-agnostic** — works with any project

## Consequences

- Requires npm ≥8.3, yarn ≥1.x, pnpm ≥6.x for override support
- Users must run `npm install` after CLI to apply
- Overrides are project-level, not global
