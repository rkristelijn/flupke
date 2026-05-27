# ADR-016: Ecosystem CI — Testing Against Real Frameworks

## Status

Accepted

## Context

Unit tests prove our packages work in isolation. But do they work when Express, Jest, or Nuxt actually use them? Commits `a833540`, `12ee55b`, `d6af0f7` built the ecosystem CI.

## Decision

Run real framework test suites with flupke overrides applied:

1. Install framework
2. Apply `npx @flupkejs/cli` overrides
3. Run framework's own tests
4. Report pass/fail per framework

## Current matrix

51 frameworks, rotating scan every 2h in CI. 44/50 passing (6 known failures tracked).

## Rationale

- **Integration proof** — not just unit tests, real-world usage
- **Regression detection** — catch breaks before users report them
- **Confidence** — "Express test suite passes with flupke overrides"
- **Upstream PR evidence** — "here's proof our replacement works in your framework"

## Consequences

- CI is slow (framework test suites are large)
- Rotating schedule to stay within CI budget
- Known failures must be tracked and resolved
