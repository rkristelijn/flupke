const { performance } = require("node:perf_hooks");
const isArray = require("../src/index.js");

const iterations = 1_000_000;
const inputs = [[], [1, 2, 3], {}, null, "hello", 42, { length: 3 }];

const start = performance.now();
for (let i = 0; i < iterations; i++) {
  for (const input of inputs) isArray(input);
}
const elapsed = performance.now() - start;

console.log(
  `@flupke/is-array: ${iterations * inputs.length} calls in ${elapsed.toFixed(1)}ms (${(((iterations * inputs.length) / elapsed) * 1000).toFixed(0)} ops/sec)`,
);
