# ADR-006: Native-First Implementation Strategy

## Status

Accepted

## Context

Many npm packages exist because platform APIs didn't exist when they were written. Node.js and browsers have since added native equivalents.

## Decision

Always prefer native platform features over custom implementations.

## Examples

| Package | Original approach | Flupke approach |
|---------|------------------|-----------------|
| `uuid` | Custom RNG | `crypto.randomUUID()` |
| `rimraf` | Recursive unlink | `fs.rm({recursive:true})` |
| `inherits` | Prototype manipulation | `class extends` / `Object.create` |
| `safe-buffer` | Polyfill | `Buffer.from` / `Buffer.alloc` |
| `function-bind` | `Function()` constructor | `.bind()` native |
| `object-assign` | Polyfill | `Object.assign` |
| `path-is-absolute` | Custom check | `path.isAbsolute` |

## Rationale

- **Performance** — native implementations are C++ optimized
- **Security** — no `eval()`, `Function()`, or dynamic code
- **Maintenance** — platform maintains it, not us
- **Size** — often 1-2 lines vs hundreds

## Minimum Node.js version

`engines.node >= 18` — this gives us access to all modern APIs.

## Consequences

- Cannot support Node.js < 18
- Must track when new native APIs become available (opportunity for simplification)
