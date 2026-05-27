# ADR-012: Staleness Tracking of Original Packages

## Status

Accepted

## Context

flupke's value proposition is replacing unmaintained packages. We need data to back this claim and track when originals become active again.

## Decision

Track last-publish dates of all original packages we replace:

- Script: `scripts/check-staleness.js`
- Output: `data/staleness.json` (git-tracked for change detection)
- Categories: Abandoned (>3y), Stale (1-3y), Active (<1y)

## Current state (2026-05-26)

| Status | Count |
|--------|-------|
| 🪦 Abandoned (>3 years) | 18 |
| ⚠️ Stale (1-3 years) | 73 |
| ✓ Active (<1 year) | 73 |

## Rationale

- **Justification** — proves the problem exists with data
- **Monitoring** — if an original becomes active again, we may deprioritize it
- **Marketing** — "18 packages we replace haven't been touched in 3+ years"
- **Risk assessment** — abandoned packages are higher supply chain risk

## Re-run cadence

Monthly, or before major releases. Diff in git shows trends.
