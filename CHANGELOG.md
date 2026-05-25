# Changelog

## v1.0.8 (2026-05-25)

- feat(lodash): native ES2020+ drop-in — 60+ functions in 8KB
- feat(axios,moment): vendor redaxios + dayjs for 100% API compatibility
- feat: add dotenv, cookie, escape-html, fast-json-stable-stringify, depd
- test: 100% mutation score — all mutants killed
- test: add tests for axios, moment, lodash (all 113 packages now tested)
- docs: 20% comment ratio, JSDoc on all packages

## v1.0.4 (2026-05-24)

- feat: add runtime packages — uuid, qs, deepmerge, eventemitter3, clsx, is-buffer
- feat(cli): add @flupkejs/cli — one command, safer dependencies
- feat: add exports field to all packages, improve TypeScript types
- perf: optimize inherits, ms — benchmarked against originals
- fix: subpath exports for escalade, signal-exit, nanoid, lru-cache
- ci: GitHub Actions with tests, benchmarks, npm publish on tags

## v1.0.0 (2026-05-24)

- Initial release: 100 packages, zero deps, TypeScript types
- Benchmarked against originals (equal or faster)
- API-compatible drop-in replacements
