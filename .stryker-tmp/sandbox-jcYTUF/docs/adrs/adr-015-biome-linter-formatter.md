# ADR-015: Biome as Linter and Formatter

## Status

Accepted

## Context

Needed a linter/formatter. Options: ESLint+Prettier, Biome, deno lint. Commit `d4da9ab` adopted Biome.

## Decision

Use Biome for both linting and formatting. Single tool, single config.

## Rationale

- **Fast** — Rust-based, orders of magnitude faster than ESLint+Prettier
- **Single tool** — replaces both ESLint and Prettier
- **Zero config** — sensible defaults, minimal `biome.json`
- **Modern** — understands latest JS/TS syntax natively
- **Consistent** — deterministic formatting, no style debates

## Commands

```bash
npx @biomejs/biome check .        # lint + format check
npx @biomejs/biome format --write . # auto-format
npx @biomejs/biome check --fix .   # auto-fix lint issues
```

## Consequences

- Some rules differ from ESLint (acceptable)
- Team must use Biome, not Prettier (enforced by CI)
- Pinned version in devDependencies for reproducibility
