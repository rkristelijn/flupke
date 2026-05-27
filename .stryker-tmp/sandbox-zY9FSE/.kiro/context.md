# flupke agent context

Monorepo with 165 zero-dependency drop-in replacement npm packages.
Replaces neglected transitive dependencies used by 51 frameworks (Express, Jest, Nuxt, Expo, etc.).

## Key numbers
- 165 packages, 5,093 LOC total (originals: ~57,785 LOC = -91% reduction)
- 857 tests, 0 failures
- 51 frameworks fingerprinted, 2,792 API signatures verified
- 18 abandoned packages replaced (>3 years no release)

## Quick commands
- Test: `node --test packages/*/test/*.test.js`
- Lint: `npx @biomejs/biome check .`
- Impact: `node scripts/impact-report.js`
- Mutations: `node scripts/mutate.js <pkg>`
- Staleness: `node scripts/check-staleness.js`

## Quality gates (from cpm)
- CPM checks: code-smells, perf, mutations
- Config: cpm.toml
- Thresholds: 95% line coverage, 90% branch, 85% mutation score
