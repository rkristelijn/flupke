// @ts-nocheck
module.exports = { mutate: ["packages/fill-range/src/index.js"], testRunner: "command", commandRunner: { command: "node --test packages/fill-range/test/index.test.js" }, reporters: ["json"], jsonReporter: { fileName: "data/mutations/fill-range.json" }, concurrency: 2, timeoutMS: 15000 };
