# ADR-007: Security Hardening Over Originals

## Status

Accepted

## Context

Several original packages have known security issues that were never fixed due to abandonment. Commit `c4e0450` removed eval from get-intrinsic, commit `5385d24` documented regex hotspot suppressions.

## Decision

Actively harden packages beyond the original's security posture:

1. **No dynamic code execution** — no `eval()`, `Function()`, `with`, `__proto__`
2. **Input validation** — bound inputs to prevent ReDoS and DoS
3. **Responsible disclosure** — report vulnerabilities to upstream before publishing

## Specific hardening

| Package | Vulnerability in original | Flupke mitigation |
|---------|--------------------------|-------------------|
| `ms` | ReDoS via unbounded input | Input length cap (100 chars) |
| `debug` | Regex injection via DEBUG env | Input sanitization before pattern matching |
| `function-bind` | Uses `Function()` constructor | Native `.bind()` only |
| `get-intrinsic` | `eval` reference | Removed, direct property access |

## Consequences

- Slightly stricter behavior (e.g., `ms` rejects strings > 100 chars)
- Must document any behavioral differences from originals
- Responsible disclosure process adds time before publishing
