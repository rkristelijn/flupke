#!/usr/bin/env node

const { spawn } = require("node:child_process");

function parseArgs(args) {
  const env = {};
  let i = 0;
  for (; i < args.length; i++) {
    const m = args[i].match(/^(\w+)=(.*)$/);
    if (!m) break;
    env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
  return { env, command: args[i], args: args.slice(i + 1) };
}

function crossEnv(args) {
  const { env, command, args: cmdArgs } = parseArgs(args);
  if (!command) {
    process.exitCode = 1;
    return null;
  }
  const child = spawn(command, cmdArgs, {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ...env },
  });
  child.on("exit", (code) => {
    process.exitCode = code || 0;
  });
  return child;
}

if (require.main === module) crossEnv(process.argv.slice(2));
module.exports = crossEnv;
module.exports.parseArgs = parseArgs;
