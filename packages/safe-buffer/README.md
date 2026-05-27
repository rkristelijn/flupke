# @flupkejs/safe-buffer

[![npm](https://img.shields.io/npm/v/@flupkejs%2Fsafe-buffer)](https://www.npmjs.com/package/@flupkejs/safe-buffer)
[![bundle](https://img.shields.io/bundlephobia/minzip/@flupkejs%2Fsafe-buffer)](https://bundlephobia.com/package/@flupkejs/safe-buffer)

Drop-in replacement for safe-buffer — delegates to native Buffer.from/alloc

## Install

```bash
npm i @flupkejs/safe-buffer
```

## What this replaces

Drop-in replacement for [`safe-buffer`](https://www.npmjs.com/package/safe-buffer). Zero dependencies, 5 lines of code.

Only the API surface used by major frameworks (Express, Next.js, Jest, etc.) is implemented — unused code is stripped.

## ⚠ Status

This package is under active development. While tested against framework usage patterns, edge cases may exist. Please [report issues](https://github.com/rkristelijn/flupke/issues) if you encounter incompatibilities.

## Part of [flupke](https://github.com/rkristelijn/flupke)

165 packages. 888 tests. Zero dependencies each.

## License

MIT
