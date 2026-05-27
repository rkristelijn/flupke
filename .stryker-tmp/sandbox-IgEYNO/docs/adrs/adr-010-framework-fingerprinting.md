# ADR-010: Framework Fingerprinting for Coverage Tracking

## Status

Accepted

## Context

We claim compatibility with 51 frameworks but had no systematic way to verify which packages they actually use or how they call them. Commit `d89f3d5` started this with Express only.

## Decision

Maintain two layers of framework fingerprinting:

### Layer 1: Dependency fingerprints (`data/dep-fingerprints/`)

For each framework (latest + previous major), install via npm and record which flupke-replaceable packages appear in `node_modules`.

- Script: `scripts/fingerprint-deps.js`
- Output: `data/dep-fingerprints/<framework>/<version>.json`
- Tracks: package presence + installed version

### Layer 2: API usage fingerprints (`data/api-usage/`)

Scan framework `node_modules` source code to extract how each replaceable package is actually called (functions, methods, properties, argument patterns).

- Script: `scripts/scan-api-usage.js`
- Output: `data/api-usage/<framework>/<version>.json`
- Tracks: 2,792 unique API signatures across 51 frameworks

### Coverage verification

- Script: `scripts/check-api-coverage.js`
- Compares framework usage against our test coverage
- Result: 100% of used API signatures are tested

## Rationale

- **Provable compatibility** — not just claimed, measured
- **Change tracking** — git diff shows when frameworks add/remove deps
- **Test prioritization** — focus testing on actually-used APIs
- **Marketing** — "verified against 51 frameworks, 2,792 API signatures"

## Consequences

- Must re-run fingerprints periodically (monthly or on framework releases)
- Storage: ~73 JSON files, ~500KB total
- Runtime: ~5 min for all 51 frameworks
