# ADR-011: CPM Quality Gates as CI Enforcement

## Status

Accepted

## Context

Quality must be enforced automatically, not by code review alone. Commits `85d9920`, `ada3f72` added the first CI quality gate. We now have multiple check scripts.

## Decision

All quality checks live in `checks/` and are runnable as CPM checks:

| Check | What it detects | Auto-fix |
|-------|----------------|----------|
| `check-slop.sh` | AI-generated filler text | No |
| `check-dead-docs.sh` | Broken doc references | No |
| `check-research-freshness.sh` | Stale research data | No |
| `check-code-smells.js` | SonarCloud code smells (for-of, replaceAll, optional chaining) | Yes |
| `check-perf.js` | Performance anti-patterns (forEach, delete, await-in-loop, arguments) | Partial |
| `check-mutations.js` | Mutation testing per package | Generates test stubs |

## Configuration

All checks read their config from `cpm.toml`:
- `[code-smells]` — exclude list and allowlist with justifications
- `[perf]` — exclude list and allowlist with justifications
- `[quality.thresholds]` — coverage and mutation score targets

## Enforcement

- Pre-commit hook runs fast checks (slop, dead docs)
- CI runs all checks on every PR
- Checks exit non-zero on failure → PR blocked

## Rationale

- **Automated** — no human gatekeeping needed
- **Documented** — allowlist entries require justification
- **Fixable** — `--fix` mode where possible
- **Configurable** — thresholds and exceptions in `cpm.toml`
