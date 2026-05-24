# Changelog

## v1.0.4 (2026-05-24)

- feat: add runtime packages — deepmerge, qs, eventemitter3, is-buffer
- feat: add uuid (crypto.randomUUID) and clsx (classnames alias)
- feat(cli): add @flupkejs/cli — one command, safer dependencies
- feat: add exports field to all packages, improve TypeScript types
- perf(classnames): replace arguments leak with rest params
- perf: optimize inherits, add isolated benchmarks and V8 performance research
- fix(escalade,lru-cache): add ./sync subpath, support v5 constructor API
- docs: positive framing, measured bundle size (-18%), cpm badges
- ci: GitHub Actions with tests, benchmarks, npm publish on tags

## v1.0.0 (2026-05-24)

- Initial release: 100 packages, zero deps, TypeScript types
- Benchmarked against originals (equal or faster)
- API-compatible drop-in replacements
