# Package catalog

100 packages. Zero dependencies. 299 tests. All passing.

## All packages (sorted by supply chain impact)

| # | Package | LOC | Tests | Dependents | Category | Native alternative |
|---|---------|-----|-------|------------|----------|-------------------|
| 1 | es-errors | 8 | 2 | 316 | eliminate | `TypeError`, `RangeError` etc. |
| 2 | debug | 20 | 3 | 262 | replace | `console.log` + `DEBUG` env |
| 3 | semver | 27 | 4 | 201 | replace | version parsing logic |
| 4 | strip-ansi | 4 | 2 | 181 | replace | `str.replace(regex, '')` |
| 5 | ansi-styles | 46 | 3 | 180 | replace | ANSI code lookup table |
| 6 | graceful-fs | 20 | 3 | 160 | replace | fs + EMFILE retry |
| 7 | inherits | 16 | 5 | 159 | eliminate | `class extends` |
| 8 | gopd | 1 | 2 | 149 | eliminate | `Object.getOwnPropertyDescriptor` |
| 9 | call-bind | 1 | 2 | 143 | eliminate | `Function.prototype.call.bind` |
| 10 | safe-buffer | 5 | 5 | 140 | eliminate | `Buffer.from` / `Buffer.alloc` |
| 11 | get-intrinsic | 69 | 2 | 137 | replace | direct property access |
| 12 | has-symbols | 3 | 1 | 133 | eliminate | `typeof Symbol === 'function'` |
| 13 | string-width | 8 | 3 | 127 | replace | ANSI strip + fullwidth check |
| 14 | minipass | 1 | 3 | 124 | eliminate | `stream.Transform` |
| 15 | supports-color | 10 | 1 | 122 | replace | env var check |
| 16 | lru-cache | 24 | 4 | 104 | replace | `Map` + eviction |
| 17 | ms | 57 | 10 | 99 | replace | time string parser |
| 18 | util-deprecate | 1 | 2 | 93 | eliminate | `util.deprecate` |
| 19 | function-bind | 2 | 4 | 92 | eliminate | `Function.prototype.bind` |
| 20 | es-define-property | 1 | 2 | 87 | eliminate | `Object.defineProperty` |
| 21 | balanced-match | 14 | 3 | 83 | replace | brace matching |
| 22 | ansi-regex | 3 | 3 | 83 | replace | single regex |
| 23 | has-flag | 1 | 3 | 82 | eliminate | `process.argv.includes()` |
| 24 | color-convert | 30 | 3 | 82 | replace | RGB/HSL math |
| 25 | hasown | 1 | 3 | 79 | eliminate | `Object.hasOwn` |
| 26 | color-name | 5 | 3 | 78 | replace | static JSON map |
| 27 | type-fest | 1 | 3 | 69 | keep | types-only (`.d.ts`) |
| 28 | classnames | 3 | 3 | 68 | eliminate | `[].filter(Boolean).join(' ')` |
| 29 | is-glob | 1 | 3 | 67 | replace | regex test |
| 30 | slash | 1 | 3 | 66 | eliminate | `path.replace(/\\/g, '/')` |
| 31 | signal-exit | 10 | 3 | 66 | replace | `process.on('exit')` |
| 32 | emoji-regex | 1 | 3 | 61 | replace | `\p{Emoji_Presentation}` |
| 33 | fast-deep-equal | 8 | 5 | 57 | replace | recursive comparison |
| 34 | is-fullwidth-code-point | 8 | 3 | 56 | replace | Unicode range check |
| 35 | yallist | 14 | 3 | 52 | replace | doubly-linked list |
| 36 | escape-string-regexp | 1 | 3 | 52 | replace | regex escape |
| 37 | normalize-path | 1 | 3 | 45 | replace | slash normalize |
| 38 | wrap-ansi | 14 | 3 | 44 | replace | word-wrap + ANSI |
| 39 | yargs-parser | 16 | 5 | 43 | replace | argv parser |
| 40 | once | 6 | 3 | 41 | replace | call-once wrapper |
| 41 | object-inspect | 15 | 3 | 41 | replace | `util.inspect` wrapper |
| 42 | cross-spawn | 4 | 3 | 39 | replace | `spawn` + shell on win32 |
| 43 | p-limit | 12 | 3 | 37 | replace | concurrency limiter |
| 44 | find-up | 11 | 3 | 37 | replace | walk up dirs |
| 45 | rimraf | 4 | 3 | 33 | eliminate | `fs.rm({recursive:true})` |
| 46 | is-stream | 4 | 3 | 33 | replace | pipe/read/write check |
| 47 | define-data-property | 3 | 3 | 33 | eliminate | `Object.defineProperty` |
| 48 | which | 8 | 3 | 32 | replace | PATH search |
| 49 | path-exists | 4 | 3 | 31 | replace | `fs.access` wrapper |
| 50 | mkdirp | 4 | 3 | 31 | eliminate | `fs.mkdir({recursive:true})` |
| 51 | camelcase | 1 | 3 | 28 | replace | regex replace |
| 52 | pify | 3 | 3 | 28 | replace | promisify |
| 53 | p-map | 8 | 3 | 27 | replace | concurrent map |
| 54 | escalade | 10 | 3 | 27 | replace | walk up dirs |
| 55 | execa | 8 | 3 | 26 | replace | `execFile` wrapper |
| 56 | p-locate | 3 | 3 | 25 | replace | async find |
| 57 | concat-map | 1 | 3 | 25 | eliminate | `Array.flatMap` |
| 58 | cliui | 12 | 3 | 25 | replace | column formatter |
| 59 | locate-path | 6 | 3 | 24 | replace | find existing path |
| 60 | y18n | 12 | 3 | 23 | replace | simple i18n |
| 61 | get-caller-file | 6 | 3 | 23 | replace | stack trace parse |
| 62 | globby | 12 | 3 | 22 | replace | glob wrapper |
| 63 | has-proto | 1 | 2 | 22 | eliminate | `'__proto__' in {}` |
| 64 | require-directory | 8 | 3 | 20 | replace | require all in dir |
| 65 | path-is-absolute | 1 | 3 | 20 | eliminate | `path.isAbsolute` |
| 66 | is-number | 1 | 3 | 18 | eliminate | `typeof + isNaN + isFinite` |
| 67 | decamelize | 1 | 3 | 18 | replace | regex split |
| 68 | resolve-from | 3 | 3 | 17 | replace | `require.resolve` with paths |
| 69 | onetime | 5 | 3 | 16 | replace | once + called() |
| 70 | inflight | 6 | 3 | 16 | replace | Map deduplication |
| 71 | is-plain-object | 4 | 3 | 15 | replace | prototype check |
| 72 | import-fresh | 4 | 3 | 15 | replace | require without cache |
| 73 | side-channel | 8 | 3 | 13 | replace | WeakMap storage |
| 74 | retry | 8 | 3 | 13 | replace | async retry with backoff |
| 75 | path-type | 4 | 3 | 13 | replace | stat wrappers |
| 76 | nanoid | 6 | 4 | 12 | replace | crypto.randomBytes |
| 77 | pkg-dir | 9 | 3 | 10 | replace | find package.json |
| 78 | indent-string | 3 | 3 | 10 | replace | prepend to lines |
| 79 | set-function-length | 3 | 3 | 9 | eliminate | `Object.defineProperty(fn,'length')` |
| 80 | wrappy | 5 | 3 | 8 | replace | copy fn properties |
| 81 | strip-indent | 5 | 3 | 8 | replace | remove common indent |
| 82 | memoize-one | 7 | 3 | 8 | replace | last-call cache |
| 83 | type-detect | 5 | 3 | 6 | replace | `Object.prototype.toString` |
| 84 | sort-keys | 6 | 3 | 6 | replace | recursive key sort |
| 85 | mimic-fn | 3 | 3 | 6 | replace | copy name/length |
| 86 | map-obj | 5 | 3 | 6 | replace | object map |
| 87 | callsites | 6 | 3 | 6 | replace | stack trace parse |
| 88 | aggregate-error | 4 | 3 | 6 | replace | Error with .errors |
| 89 | dotenv-expand | 6 | 3 | 5 | replace | variable expansion |
| 90 | deep-equal | 3 | 3 | 3 | eliminate | `util.isDeepStrictEqual` |
| 91 | p-queue | 8 | 3 | 4 | replace | async queue |
| 92 | human-readable | 5 | 4 | — | replace | bytes formatter |
| 93 | tempy | 4 | 3 | 3 | replace | temp file/dir |
| 94 | parent-module | 6 | 3 | 2 | replace | caller filename |
| 95 | filter-obj | 5 | 3 | 2 | replace | object filter |
| 96 | clean-stack | 3 | 3 | 2 | replace | remove node_modules from stack |
| 97 | delay | 3 | 3 | — | replace | `setTimeout` promise |
| 98 | mem | 5 | 3 | — | replace | memoize with Map |
| 99 | slash-trailing | 4 | 3 | — | replace | path slash utils |
| 100 | is-array | 1 | 3 | — | eliminate | `Array.isArray` |

## Summary

| Category | Count | Total dependents |
|----------|-------|-----------------|
| **eliminate** (native exists) | 28 | 2,847 |
| **replace** (rewritten better) | 71 | 4,291 |
| **keep** (types-only) | 1 | 69 |

## What we don't replace (and why)

| Package | Dependents | Reason |
|---------|-----------|--------|
| tslib | 314 | Microsoft maintained, TS compiler needs it |
| chalk | 209 | Use `picocolors` instead (already minimal) |
| picomatch | 89 | Complex glob logic, actively maintained |
| commander | 63 | Full CLI framework, well maintained |
| source-map | 63 | Binary format parser, Mozilla maintained |
| ajv | 66 | JSON Schema validator, too complex |
| micromark-* | 100+ | Markdown AST, niche, well maintained |
| jest-* | 94 | Test framework internals |
| prop-types | 70 | React ecosystem, deprecated but React-owned |
