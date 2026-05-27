# Native Replacement Matrix

Which npm packages can be replaced by native platform APIs (Node.js 18+, modern browsers)?

This matrix shows what flupke uses internally — proving these packages are unnecessary in modern runtimes.

## Direct native replacements

These packages exist only because the native API didn't exist when they were written.

| Package | Native replacement | Since |
|---------|-------------------|-------|
| `rimraf` | `fs.rm(path, { recursive: true })` | Node 14.14 |
| `mkdirp` | `fs.mkdir(path, { recursive: true })` | Node 10.12 |
| `safe-buffer` | `Buffer.from()` / `Buffer.alloc()` | Node 5.10 |
| `safer-buffer` | `Buffer.from()` / `Buffer.alloc()` | Node 5.10 |
| `uuid` | `crypto.randomUUID()` | Node 19 |
| `inherits` | `class extends` | ES2015 |
| `function-bind` | `Function.prototype.bind()` | ES5 |
| `is-array` | `Array.isArray()` | ES5 |
| `is-buffer` | `Buffer.isBuffer()` | Node 0.1 |
| `is-promise` | `obj?.then instanceof Function` | ES2015 |
| `is-number` | `typeof x === 'number' && !isNaN(x)` | Always |
| `is-plain-object` | `Object.getPrototypeOf(obj) === Object.prototype` | ES5 |
| `is-stream` | `typeof obj?.pipe === 'function'` | Always |
| `path-is-absolute` | `path.isAbsolute()` | Node 0.11 |
| `path-exists` | `fs.access()` / `fs.stat()` | Always |
| `has-flag` | `process.argv.includes()` | ES2016 |
| `hasown` | `Object.hasOwn()` | ES2022 |
| `has-symbols` | `typeof Symbol !== 'undefined'` | ES2015 |
| `has-proto` | `Object.getPrototypeOf({}) !== null` | ES5 |
| `gopd` | `Object.getOwnPropertyDescriptor()` | ES5 |
| `define-data-property` | `Object.defineProperty()` | ES5 |
| `es-define-property` | `Object.defineProperty()` | ES5 |
| `es-errors` | Native `Error` subclasses | ES2015 |
| `setprototypeof` | `Object.setPrototypeOf()` | ES2015 |
| `aggregate-error` | `AggregateError` | ES2021 |
| `deep-equal` | `structuredClone()` + comparison | Node 17 |
| `events` | `EventTarget` / `EventEmitter` | Always |
| `util-deprecate` | `util.deprecate()` | Always |
| `concat-map` | `Array.prototype.flatMap()` | ES2019 |
| `inflight` | `Map` + `Promise` | ES2015 |
| `once` | Closure + flag | Always |
| `wrappy` | Closure + `Object.assign()` | ES2015 |
| `signal-exit` | `process.on('exit')` + `process.on('SIGINT')` | Always |
| `get-caller-file` | `Error().stack` parsing | Always |
| `nanoid` | `crypto.randomUUID()` or `crypto.getRandomValues()` | Node 19 |

## Native-first rewrites (simpler than original)

These packages do something useful but the implementation can be drastically simplified with modern APIs.

| Package | Strategy | flupke LOC |
|---------|----------|-----------|
| `ms` | Time parser rewrite + input validation | 57 |
| `debug` | `console.log` + `DEBUG` env matching | 20 |
| `semver` | Version parsing with modern regex | 27 |
| `strip-ansi` | `str.replace(/\x1b\[[0-9;]*m/g, '')` | 4 |
| `graceful-fs` | `fs` + EMFILE retry loop | 20 |
| `escape-html` | Character map replace | 10 |
| `encodeurl` | `encodeURI` + selective encoding | 12 |
| `bytes` | Parse/format with lookup table | 30 |
| `etag` | `crypto.createHash('sha1')` + stat | 25 |
| `fresh` | HTTP conditional request logic | 20 |
| `parseurl` | `new URL()` with caching | 15 |
| `content-type` | Simple parser, no regex engine | 30 |
| `cookie` | Parse/serialize with validation | 40 |
| `qs` | `URLSearchParams` + nesting logic | 60 |
| `dotenv` | `fs.readFileSync` + line parser | 30 |
| `lru-cache` | `Map` (insertion-order) | 25 |
| `p-limit` | `Promise` + queue | 15 |
| `p-map` | `Promise.all` + concurrency pool | 20 |
| `execa` | `child_process.execFile` + streams | 30 |
| `cross-spawn` | `child_process.spawn` + path resolution | 20 |
| `globby` | `fs.glob()` (Node 22) or recursive readdir | 25 |
| `find-up` | Recursive `path.dirname()` + `fs.access()` | 12 |
| `resolve-from` | `require.resolve()` with paths | 8 |
| `which` | `PATH` split + `fs.access(X_OK)` | 15 |

## Why these packages still exist

| Reason | Example |
|--------|---------|
| Pre-ES2015 compatibility | `inherits`, `function-bind` |
| Pre-Node 14 compatibility | `rimraf`, `mkdirp` |
| Ecosystem inertia | `safe-buffer` (Node 5 solved this) |
| No one bothered to remove them | `is-array` (ES5 solved this) |
| Framework lock-in | Express depends on `ms`, `debug`, etc. |

## The cost of keeping them

- **Security**: unmaintained code accumulates vulnerabilities
- **Bundle size**: unnecessary bytes shipped to users
- **Install time**: more packages = slower `npm install`
- **Audit noise**: `npm audit` flags transitive deps you can't control
- **Supply chain**: each package is an attack vector

## How flupke helps

```bash
npx @flupkejs/cli
```

Scans your `node_modules`, identifies replaceable packages, writes overrides. Your code doesn't change — only what's underneath.
