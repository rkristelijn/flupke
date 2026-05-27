# ADR-017: Inline Internal Dependencies at Publish Time

## Status

Accepted

## Context

Some packages compose other flupke packages internally (e.g., `micromatch` uses `picomatch` + `braces`, `minimatch` uses `braces`, `glob` uses `minimatch`). In development these use `require("../../picomatch/src/index.js")`.

This breaks on npm publish — the relative path doesn't exist in the published tarball.

Options:
- **A)** Add `@flupkejs/picomatch` as a real dependency → breaks zero-dep guarantee (ADR-005)
- **B)** Copy-paste the code into each package → duplication, maintenance burden
- **C)** Inline at publish time via script → DRY source, zero-dep published output

## Decision

Option C: inline internal references at publish time.

- Source uses `require("../../other/src/index.js")` for DRY development
- `scripts/inline-deps.js --write` produces `dist/<pkg>/index.js` with all refs inlined as IIFEs
- Published packages are standalone, zero-dep, single-file

## Affected packages

| Package | Inlines |
|---------|---------|
| `micromatch` | picomatch, braces |
| `minimatch` | braces |
| `glob` | minimatch (which inlines braces) |
| `lodash-es` | lodash |

## Rationale

- **Zero-dep preserved** — published packages have no `dependencies` field
- **DRY source** — no copy-paste, single source of truth for picomatch/braces
- **Auditable** — `dist/` output can be inspected before publish
- **Automated** — part of the publish pipeline, not manual

## Consequences

- Publish pipeline must run `inline-deps.js` before `npm publish`
- `dist/` is gitignored (generated artifact)
- Inlined code increases published file size slightly (acceptable — still 90%+ smaller than originals)
