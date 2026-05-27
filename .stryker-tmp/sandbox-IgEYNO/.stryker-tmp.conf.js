// @ts-nocheck
module.exports = { mutate: ["packages/ms/src/index.js"], testRunner: "command", commandRunner: { command: "node --test packages/ms/test/index.test.js" }, reporters: ["json"], jsonReporter: { fileName: "data/mutations/ms.json" }, concurrency: 2, timeoutMS: 15000 };
