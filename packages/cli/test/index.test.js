const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const CLI = path.join(__dirname, "..", "src", "index.js");

function run(dir, args = "") {
  return execSync(`node ${CLI} ${args}`, { encoding: "utf8", cwd: dir });
}

function createTmpProject(pm = "npm") {
  const tmp = fs.mkdtempSync(path.join(require("node:os").tmpdir(), "flupke-test-"));
  fs.writeFileSync(path.join(tmp, "package.json"), JSON.stringify({ name: "test", dependencies: {} }));
  if (pm === "pnpm") fs.writeFileSync(path.join(tmp, "pnpm-lock.yaml"), "");
  if (pm === "yarn") fs.writeFileSync(path.join(tmp, "yarn.lock"), "");
  // Create fake node_modules with known packages
  const nm = path.join(tmp, "node_modules");
  fs.mkdirSync(nm);
  fs.mkdirSync(path.join(nm, "ms"));
  fs.mkdirSync(path.join(nm, "debug"));
  fs.mkdirSync(path.join(nm, "semver"));
  // For pnpm, create .pnpm structure
  if (pm === "pnpm") {
    const pnpm = path.join(nm, ".pnpm");
    fs.mkdirSync(pnpm);
    fs.mkdirSync(path.join(pnpm, "ms@2.1.3"));
    fs.mkdirSync(path.join(pnpm, "debug@4.3.4"));
    fs.mkdirSync(path.join(pnpm, "semver@7.5.0"));
  }
  return tmp;
}

function cleanup(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

test("no package.json exits with error", () => {
  const tmp = fs.mkdtempSync(path.join(require("node:os").tmpdir(), "flupke-test-"));
  assert.throws(() => run(tmp), /No package.json/);
  cleanup(tmp);
});

test("npm: finds packages in flat node_modules", () => {
  const tmp = createTmpProject("npm");
  const output = run(tmp, "--dry-run");
  assert.match(output, /ms/);
  assert.match(output, /debug/);
  assert.match(output, /semver/);
  assert.match(output, /Dry run/);
  cleanup(tmp);
});

test("pnpm: finds packages in .pnpm folder", () => {
  const tmp = createTmpProject("pnpm");
  const output = run(tmp, "--dry-run");
  assert.match(output, /ms/);
  assert.match(output, /debug/);
  assert.match(output, /semver/);
  cleanup(tmp);
});

test("writes npm overrides", () => {
  const tmp = createTmpProject("npm");
  run(tmp);
  const pkg = JSON.parse(fs.readFileSync(path.join(tmp, "package.json"), "utf8"));
  assert.ok(pkg.overrides);
  assert.equal(pkg.overrides.ms, "npm:@flupkejs/ms@^1.0.0");
  cleanup(tmp);
});

test("writes pnpm overrides", () => {
  const tmp = createTmpProject("pnpm");
  run(tmp);
  const pkg = JSON.parse(fs.readFileSync(path.join(tmp, "package.json"), "utf8"));
  assert.ok(pkg.pnpm?.overrides);
  assert.equal(pkg.pnpm.overrides.ms, "npm:@flupkejs/ms@^1.0.0");
  cleanup(tmp);
});

test("writes yarn resolutions", () => {
  const tmp = createTmpProject("yarn");
  run(tmp);
  const pkg = JSON.parse(fs.readFileSync(path.join(tmp, "package.json"), "utf8"));
  assert.ok(pkg.resolutions);
  assert.equal(pkg.resolutions.ms, "npm:@flupkejs/ms@^1.0.0");
  cleanup(tmp);
});

test("--uninstall removes overrides", () => {
  const tmp = createTmpProject("npm");
  run(tmp);
  const before = JSON.parse(fs.readFileSync(path.join(tmp, "package.json"), "utf8"));
  assert.ok(before.overrides);
  run(tmp, "--uninstall");
  const after = JSON.parse(fs.readFileSync(path.join(tmp, "package.json"), "utf8"));
  assert.equal(after.overrides, undefined);
  cleanup(tmp);
});

test("no replaceable packages found", () => {
  const tmp = fs.mkdtempSync(path.join(require("node:os").tmpdir(), "flupke-test-"));
  fs.writeFileSync(path.join(tmp, "package.json"), JSON.stringify({ name: "test" }));
  fs.mkdirSync(path.join(tmp, "node_modules"));
  fs.mkdirSync(path.join(tmp, "node_modules", "some-unknown-pkg"));
  const output = run(tmp);
  assert.match(output, /No replaceable packages found/);
  cleanup(tmp);
});

test("prints version", () => {
  const tmp = createTmpProject("npm");
  const output = run(tmp, "--dry-run");
  assert.match(output, /flupke.*v\d+\.\d+\.\d+/);
  cleanup(tmp);
});

test("prints flupked message", () => {
  const tmp = createTmpProject("npm");
  const output = run(tmp);
  assert.match(output, /You have been flupked/);
  cleanup(tmp);
});

test("prints unflupked message", () => {
  const tmp = createTmpProject("npm");
  run(tmp);
  const output = run(tmp, "--uninstall");
  assert.match(output, /unflupked/);
  cleanup(tmp);
});
