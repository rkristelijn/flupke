# ADR-018: Overlapping Packages Are Intentional

## Status

Accepted

## Context

Several flupke packages solve the same problem with different APIs:

| Domain | Packages | Why both exist |
|--------|----------|---------------|
| Terminal colors | `chalk`, `kleur`, `picocolors`, `ansi-styles` | Different API styles, different framework consumers |
| Glob matching | `picomatch`, `micromatch`, `minimatch`, `glob` | Different scope (single pattern → full filesystem) |
| Class names | `classnames`, `clsx` | Same API, different npm names (clsx is the successor) |
| Buffer | `safe-buffer`, `safer-buffer` | Same purpose, different authors, both in dependency trees |
| Path utils | `slash`, `normalize-path`, `path-is-absolute` | Trivial but each has millions of dependents |

## Decision

We replace what frameworks use, not what we prefer. If Express uses `chalk` and Svelte uses `kleur`, we ship both.

## Rationale

- **Drop-in compatibility** — the override mechanism maps `chalk` → `@flupkejs/chalk`, not `chalk` → `@flupkejs/kleur`
- **Different APIs** — chalk has chainable getters + RGB/hex, kleur has plain functions. They're not interchangeable.
- **Different consumers** — removing one would break frameworks that depend on it
- **Minimal cost** — each is 30-120 LOC. The "duplication" is ~200 LOC total across all color packages.

## Internal code sharing

Where possible, packages compose internally:
- `micromatch` uses `picomatch` + `braces`
- `minimatch` uses `braces`
- `glob` uses `minimatch`

But published packages are standalone (ADR-017: inline at publish).

## Consequences

- Package count is higher than strictly necessary
- Some test overlap (color output assertions appear in chalk, kleur, picocolors tests)
- Clear documentation needed so users understand which to use (answer: whichever your framework already uses)
