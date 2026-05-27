// @ts-nocheck
module.exports = { mutate: ["packages/semver/src/index.js"], testRunner: "command", commandRunner: { command: "node --test packages/semver/test/index.test.js" }, reporters: ["json"], jsonReporter: { fileName: "data/mutations/semver.json" }, concurrency: 2, timeoutMS: 15000 };
