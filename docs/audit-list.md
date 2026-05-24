# flupke audit list

Packages sorted by blast radius (dependents in top-100 repos). Action: what flupke does.

## Legend

- **ELIMINATE** — package is obsolete, native replacement exists. flupke provides a zero-cost shim.
- **REPLACE** — package is needed but poorly maintained. flupke provides a faster, tested rewrite.
- **KEEP** — well maintained or too complex to replace. Monitor only.

## Tier 1: highest blast radius (>80 dependents)

| Package | Deps | LOC | Stale | Category | Action | Reason |
|---------|------|-----|-------|----------|--------|--------|
| es-errors | 316 | 49 | 806d | es-polyfill | ELIMINATE | Native Error subclasses |
| tslib | 314 | 1453 | 82d | compiler | KEEP | TS runtime, Microsoft maintained |
| graceful-fs | 160 | 960 | 210d | filesystem | REPLACE | EMFILE retry wrapper, 50 LOC core |
| inherits | 159 | 53 | 210d | node-polyfill | ELIMINATE | `class extends` is native |
| gopd | 149 | 24 | 63d | es-polyfill | ELIMINATE | `Object.getOwnPropertyDescriptor` is native |
| safe-buffer | 140 | 251 | 2033d | node-polyfill | ELIMINATE | `Buffer.from/alloc` native since Node 6 |
| has-symbols | 133 | 66 | 25d | es-polyfill | ELIMINATE | `typeof Symbol !== 'undefined'` |
| lodash | 100 | 56363 | 16d | utility | ELIMINATE | Native Array/Object methods cover 95% |
| ms | 99 | 283 | 3d | terminal | REPLACE | Time parser, 50 LOC rewrite |
| util-deprecate | 93 | - | - | node-polyfill | ELIMINATE | `util.deprecate` is native |
| function-bind | 92 | 89 | 954d | es-polyfill | ELIMINATE | `.bind()` is native since ES5 |
| picomatch | 89 | 2854 | 60d | filesystem | KEEP | Complex glob, well maintained |
| isarray | 87 | 7 | 61d | node-polyfill | ELIMINATE | `Array.isArray()` native since ES5 |
| es-define-property | 87 | 16 | 533d | es-polyfill | ELIMINATE | `Object.defineProperty` is native |
| ansi-regex | 83 | 337 | 94d | terminal | REPLACE | Single regex pattern |
| balanced-match | 83 | - | - | filesystem | REPLACE | Brace matching, 30 LOC |
| has-flag | 82 | - | - | terminal | ELIMINATE | `process.argv.includes()` |
| color-name | 78 | - | - | terminal | REPLACE | Static JSON lookup |

## Tier 2: medium blast radius (40-80 dependents)

| Package | Deps | Category | Action | Reason |
|---------|------|----------|--------|--------|
| classnames | 68 | utility | ELIMINATE | `[a, b && 'c'].filter(Boolean).join(' ')` |
| slash | 66 | filesystem | ELIMINATE | `path.replace(/\\/g, '/')` — one line |
| signal-exit | 66 | terminal | REPLACE | `process.on('exit')` wrapper |
| source-map | 63 | compiler | KEEP | Complex, Mozilla maintained |
| commander | 63 | utility | KEEP | CLI framework, well maintained |
| picocolors | 62 | terminal | KEEP | Already minimal (3.8KB) |
| object-inspect | 41 | es-polyfill | REPLACE | `util.inspect` or `JSON.stringify` |

## Tier 3: planned (20-40 dependents)

| Package | Deps | Action | Reason |
|---------|------|--------|--------|
| strip-ansi | 35 | REPLACE | `str.replace(ansiRegex, '')` |
| supports-color | 32 | REPLACE | Env var check, 20 LOC |
| debug | 28 | REPLACE | `console.log` + `DEBUG` env |
| semver | 25 | REPLACE | Version parsing, 100 LOC core |
| lru-cache | 22 | REPLACE | `Map` + eviction, 50 LOC |
| rimraf | 20 | ELIMINATE | `fs.rm({recursive: true})` native Node 14+ |
| mkdirp | 20 | ELIMINATE | `fs.mkdir({recursive: true})` native Node 10+ |

## Summary

| Action | Count | Strategy |
|--------|-------|----------|
| ELIMINATE | 18 | Zero-cost shim that delegates to native |
| REPLACE | 14 | Rewrite: faster, smaller, tested, typed |
| KEEP | 7 | Monitor, don't replace |
| **Total actionable** | **32** | |

## flupke value proposition

For each replaced package, flupke guarantees:

- **Smaller**: zero deps, minimal code (native-first)
- **Faster**: benchmarked against original, equal or better
- **Safer**: no `Function()` constructor, no `eval`, no `__proto__`
- **Typed**: full TypeScript strict mode, exported .d.ts
- **Tested**: 100% branch coverage, property-based tests
- **Maintained**: CI on every push, multiple reviewers, SECURITY.md
- **Compatible**: same API, drop-in via npm overrides
- **AI-ready**: CONTRIBUTING.md, clear code, no magic

## Usage

```json
{
  "overrides": {
    "safe-buffer": "npm:@flupke/safe-buffer@^1.0.0",
    "inherits": "npm:@flupke/inherits@^1.0.0",
    "isarray": "npm:@flupke/is-array@^1.0.0",
    "ms": "npm:@flupke/ms@^1.0.0",
    "function-bind": "npm:@flupke/function-bind@^1.0.0"
  }
}
```

Or auto-generate: `node scripts/generate-overrides.js /path/to/your/project`
