# V8 Performance Patterns for flupke

Research into what actually makes JavaScript faster in V8 (Node.js / Chrome).

## Tools

| Tool | What it does | Usage |
|------|-------------|-------|
| `node --trace-opt` | Shows which functions get optimized | `node --trace-opt app.js` |
| `node --trace-deopt` | Shows deoptimizations (performance cliffs) | `node --trace-deopt app.js` |
| `node --allow-natives-syntax` | Access V8 internals like `%GetOptimizationStatus()` | For testing only |
| [deoptigate](https://github.com/thlorenz/deoptigate) | Visual V8 deoptimization investigator | `npx deoptigate app.js` |
| `d8 --trace-ic` | Shows inline cache state transitions | Requires V8 debug build |

## Patterns that matter

### 1. Monomorphic functions (biggest impact)

V8 optimizes functions that always receive the same types/shapes.

```js
// ✓ Monomorphic — V8 can specialize
function getX(point) { return point.x; }
getX({ x: 1, y: 2 }); // always same shape
getX({ x: 3, y: 4 }); // same shape → fast

// ✗ Polymorphic — V8 generates slower generic code
getX({ x: 1, y: 2 });
getX({ x: 3, name: 'foo' }); // different shape → slow
```

**For flupke**: our packages are called with consistent types (strings to `ms`, arrays to `isarray`). This is already monomorphic by nature.

### 2. Consistent object shapes / hidden classes

Objects initialized the same way share a hidden class → faster property access.

```js
// ✓ Same hidden class
const a = { x: 1, y: 2 };
const b = { x: 3, y: 4 };

// ✗ Different hidden classes
const a = { x: 1, y: 2 };
const b = {};
b.x = 3;  // different transition chain
b.y = 4;
```

**For flupke**: not relevant — our packages don't create objects in hot paths.

### 3. Avoid type changes in variables

```js
// ✓ Type-stable
let total = 0;
total += arr[i]; // always number

// ✗ Type-unstable
let result = 0;
result = "error"; // type changed → deopt
```

### 4. Function structure affects inlining

V8's TurboFan inlines small, frequently-called functions. Separate hot paths into small functions.

```js
// ✓ Small functions → inlineable
function fmtShort(ms) {
  if (ms >= 86400000) return Math.round(ms / 86400000) + 'd';
  // ...
}

// ✗ One big function with branching → harder to inline
function format(ms, options) {
  if (options && options.long) { /* ... */ }
  else { /* ... */ }
}
```

**For flupke/ms**: this is exactly why splitting into `fmtShort`/`fmtLong` helps.

### 5. Avoid megamorphic call sites

When a function is called with >4 different object shapes, V8 gives up on inline caching (megamorphic). Performance drops significantly.

### 6. Array element kinds

V8 tracks array types internally:
- `PACKED_SMI_ELEMENTS` — integers only (fastest)
- `PACKED_DOUBLE_ELEMENTS` — floats
- `PACKED_ELEMENTS` — mixed
- `HOLEY_*` — arrays with gaps (slowest)

Once an array becomes HOLEY or mixed, it never goes back.

```js
// ✓ Dense, same-type
const arr = [1, 2, 3, 4, 5];

// ✗ Holey
const arr = new Array(100); // holey
arr[0] = 1;
```

### 7. `var` vs `const` vs `let` — no performance difference

In modern V8 (TurboFan), there is **no performance difference** between `var`, `const`, and `let`. The old Crankshaft issues with `let`/`const` were fixed in V8 5.6+ (Node 8+).

Use `const` for readability, not performance.

### 8. What does NOT matter anymore (TurboFan era)

The Bluebird "optimization killers" wiki is **outdated** (Crankshaft era, pre-Node 8). These are no longer issues:

- ~~`try/catch` prevents optimization~~ → fixed in V8 5.3
- ~~`for...of` prevents optimization~~ → fixed
- ~~generators prevent optimization~~ → fixed in V8 5.7
- ~~`let`/`const` prevent optimization~~ → fixed in V8 5.6
- ~~>128 switch cases~~ → fixed

Still avoid:
- `eval()` — always prevents optimization
- `with` — always prevents optimization
- `arguments` leaking — still problematic
- `debugger` statement in production code

## What this means for flupke

Our packages are tiny utility functions. The key performance factors are:

1. **Function call overhead** — keep entry-point dispatch minimal
2. **Inlining** — small separate functions (like `fmtShort`/`fmtLong`) get inlined by TurboFan
3. **Type stability** — always return the same type from the same code path
4. **No dynamic code** — no `eval`, no `Function()`, no `with`

### Specific findings from our benchmarks

| Issue | Cause | Fix |
|-------|-------|-----|
| `ms` format was 80% slower | Single `format()` function with `options` check on every call | Split into `fmtShort()`/`fmtLong()`, dispatch at entry |
| `isarray` ~3% slower | Noise — both delegate to `Array.isArray` | No fix needed, within margin |
| `inherits` ~5% slower | Extra validation checks (type guards) | Acceptable tradeoff: safety > 5% in cold code |

### Benchmark methodology

- Always warmup before measuring (1000+ calls)
- Run multiple rounds to detect JIT instability
- Test in isolation (separate processes) to avoid IC pollution between original/flupke
- Use `performance.now()` not `Date.now()`

## References

- [V8 blog: Elements kinds](https://v8.dev/blog/elements-kinds)
- [Mathias Bynens: Shapes and Inline Caches](https://mathiasbynens.be/notes/shapes-ics)
- [deoptigate](https://github.com/thlorenz/deoptigate) — V8 deoptimization investigator
- [Bluebird Optimization Killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers) — outdated but historically interesting
- `node --trace-opt --trace-deopt` — built-in V8 tracing
