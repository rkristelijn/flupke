const fs = require("fs");
const path = require("path");

const pkgDirs = fs
  .readdirSync("packages")
  .filter((d) => fs.existsSync(path.join("packages", d, "package.json")));

let count = 0;
for (const dir of pkgDirs) {
  const pkgPath = path.join("packages", dir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const name = pkg.name;
  const desc = pkg.description || "";
  const srcPath = path.join("packages", dir, "src", "index.js");
  const loc = fs.existsSync(srcPath)
    ? fs.readFileSync(srcPath, "utf8").trimEnd().split("\n").length
    : "?";

  const readme = [
    `# ${name}`,
    "",
    `[![npm](https://img.shields.io/npm/v/${name.replace("/", "%2F")})](https://www.npmjs.com/package/${name})`,
    `[![bundle](https://img.shields.io/bundlephobia/minzip/${name.replace("/", "%2F")})](https://bundlephobia.com/package/${name})`,
    "",
    desc,
    "",
    "## Install",
    "",
    "```bash",
    `npm i ${name}`,
    "```",
    "",
    "## What this replaces",
    "",
    `Drop-in replacement for [\`${dir}\`](https://www.npmjs.com/package/${dir}). Zero dependencies, ${loc} lines of code.`,
    "",
    "Only the API surface used by major frameworks (Express, Next.js, Jest, etc.) is implemented — unused code is stripped.",
    "",
    "## ⚠ Status",
    "",
    "This package is under active development. While tested against framework usage patterns, edge cases may exist. Please [report issues](https://github.com/rkristelijn/flupke/issues) if you encounter incompatibilities.",
    "",
    "## Part of [flupke](https://github.com/rkristelijn/flupke)",
    "",
    "165 packages. 888 tests. Zero dependencies each.",
    "",
    "## License",
    "",
    "MIT",
    "",
  ].join("\n");

  fs.writeFileSync(path.join("packages", dir, "README.md"), readme);
  if (pkg.files && !pkg.files.includes("README.md")) {
    pkg.files.push("README.md");
    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  }
  count++;
}
console.log(`Generated ${count} READMEs`);
