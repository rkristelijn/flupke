/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
module.exports = {
  mutate: [
    'packages/ms/src/index.js',
    'packages/inherits/src/index.js',
    'packages/function-bind/src/index.js',
    'packages/safe-buffer/src/index.js',
    'packages/is-array/src/index.js',
    'packages/escape-html/src/index.js',
    'packages/cookie/src/index.js',
    'packages/fast-json-stable-stringify/src/index.js',
    'packages/dotenv/src/index.js',
    'packages/deepmerge/src/index.js',
    'packages/qs/src/index.js',
    'packages/uuid/src/index.js',
    'packages/eventemitter3/src/index.js',
    'packages/clsx/src/index.js',
  ],
  testRunner: 'command',
  commandRunner: {
    command: 'node --test packages/ms/test/*.test.js packages/inherits/test/*.test.js packages/function-bind/test/*.test.js packages/safe-buffer/test/*.test.js packages/is-array/test/*.test.js packages/escape-html/test/*.test.js packages/cookie/test/*.test.js packages/fast-json-stable-stringify/test/*.test.js packages/dotenv/test/*.test.js packages/deepmerge/test/*.test.js packages/qs/test/*.test.js packages/uuid/test/*.test.js packages/eventemitter3/test/*.test.js packages/clsx/test/*.test.js'
  },
  reporters: ['clear-text', 'progress'],
  concurrency: 4,
  timeoutMS: 10000,
};
