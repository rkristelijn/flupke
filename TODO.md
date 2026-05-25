# TODO

## Subpath exports

- [ ] debug: ./src subpath
- [ ] semver: ./functions/* subpaths

## Framework validation

- [ ] Verify exact framework dep counts (currently estimated)
- [ ] Test with Nuxt, Remix, Astro, SvelteKit

## CLI improvements

- [ ] Show bundle size estimate in report
- [ ] Support --dry-run flag

## Known limitations

- `moment`: uses dayjs (immutable) — `add()`/`subtract()` return new instance instead of mutating
- `axios`: missing upload progress, proxy, maxRedirects
- `lodash`: missing `_.curry`, `_.flow`, `_.template`, `_.cloneDeepWith`
