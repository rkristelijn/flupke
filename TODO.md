# TODO

## Validate claims

- [ ] Run coverage: `node --test --experimental-test-coverage packages/*/test/*.test.js`
- [ ] Run benchmarks vs originals: `node packages/*/bench/*.bench.js`
- [ ] Verify framework dep counts: scaffold Next.js, React, Vue, Angular, Nuxt, NestJS, SvelteKit, Remix, Astro, Express → parse lockfile → count flupke-replaceable packages
- [ ] Update docs/compare.md with real numbers from above

## CLI (`@flupke/cli`)

- [ ] Detect package manager (npm/yarn/pnpm)
- [ ] Parse lockfile → find replaceable packages
- [ ] Write correct override format (`overrides` / `resolutions` / `pnpm.overrides`)
- [ ] Generate before/after report (unmaintained count, untested count, total weight, CVEs)
- [ ] `npx @flupke/cli` single-command UX
