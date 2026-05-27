# ADR-003: Quality Thresholds for Foundation-Level Code

## Status

Accepted

## Context

flupke replaces transitive dependencies used by 51+ frameworks (Express, Jest, Nuxt, Expo, etc.). A bug in any flupke package has a blast radius of millions of applications. We claim "identical API — drop-in replacement" for 165 packages.

Current metrics (2026-05-26):
- Line coverage: 88.4% (SonarCloud)
- Mutation score: ~65% average (Stryker)
- Packages: 165, total 5,093 LOC

This is insufficient for infrastructure code. Industry references:

| Project | Role | Coverage standard |
|---------|------|-------------------|
| SQLite | Database engine | 100% branch, 100% MC/DC |
| Node.js core | Runtime | ~95% line |
| Go stdlib | Standard library | ~95% line |
| curl | HTTP client | ~90% line |
| NASA flight software | Safety-critical | 100% MC/DC |

flupke is closest to SQLite in nature: small, foundational, enormous blast radius, no fallback layer.

## Decision

Enforce the following quality thresholds as CI gates:

| Metric | Threshold | Rationale |
|--------|-----------|-----------|
| Line coverage | **95%** | Every line must be exercised |
| Branch coverage | **90%** | Error paths and edge cases must be tested |
| Mutation score | **85%** | Tests must actually detect faults, not just touch code |

### Per-package enforcement

Every package in `packages/` must individually meet these thresholds. A single package below threshold fails the gate.

### Exceptions

Packages may be exempted with justification in `cpm.toml`:

```toml
[quality.exceptions]
"chalk" = "env/TTY detection branches untestable in CI without pty"
```

Exceptions must be reviewed quarterly.

## Implementation

1. `checks/check-coverage.js` — runs tests with `--experimental-test-coverage`, enforces line/branch thresholds
2. `checks/check-mutations.js` — runs Stryker per-package, enforces mutation score threshold
3. Thresholds configured in `cpm.toml`:

```toml
[quality.thresholds]
line-coverage = 95
branch-coverage = 90
mutation-score = 85
```

4. CI runs both checks on every PR
5. SonarCloud quality gate aligned to same thresholds

## Consequences

### Positive

- Provable quality for infrastructure code
- Every claimed API behavior is verified to be tested
- Mutation testing catches "coverage theater" (tests that touch code but don't assert)
- Confidence for upstream framework PRs ("here's proof it works")
- Marketing: "95% coverage, 85% mutation score — tested like flight software"

### Negative

- Higher bar for new packages (must ship with full test coverage)
- Some branches genuinely hard to test (TTY detection, OS-specific paths)
- Mutation testing is slow (~2 min per package)
- May slow down development velocity initially

### Mitigations

- `--fix` mode generates test stubs for uncovered mutations
- Per-package runs allow incremental improvement
- Exception mechanism for genuinely untestable code
- Parallel CI runs for mutation testing

## Roadmap

| Phase | Target | Timeline |
|-------|--------|----------|
| 1 | All packages ≥80% mutation | 2 weeks |
| 2 | All packages ≥85% mutation | 4 weeks |
| 3 | All packages ≥90% line coverage | 2 weeks |
| 4 | All packages ≥95% line coverage | 4 weeks |
| 5 | CI gate enforced, no exceptions | 6 weeks |
