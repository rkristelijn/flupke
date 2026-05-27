// @ts-nocheck
const fs = require("node:fs");
const path = require("node:path");

/** Parse a .env file string into key-value pairs */
function parse(src) {
  const obj = {};
  const lines = src.toString().replace(/\r\n?/g, "\n").split("\n");
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line[0] === "#") continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (
      (val[0] === '"' && val[val.length - 1] === '"') ||
      (val[0] === "'" && val[val.length - 1] === "'")
    ) {
      val = val.slice(1, -1);
    }
    val = val.replace(/\\n/g, "\n");
    obj[key] = val;
  }
  return obj;
}

/** Load .env file and populate process.env */
function config(options) {
  const dotenvPath = options?.path || path.resolve(process.cwd(), ".env");
  const encoding = options?.encoding || "utf8";
  const override = options?.override;
  try {
    const src = fs.readFileSync(dotenvPath, { encoding: encoding });
    const parsed = parse(src);
    populate(process.env, parsed, { override: override });
    return { parsed: parsed };
  } catch (e) {
    return { error: e };
  }
}

function populate(target, source, options) {
  const override = options?.override;
  for (const key in source) {
    if (override || !(key in target)) {
      target[key] = source[key];
    }
  }
}

// Public API
module.exports = {
  config: config,
  configDotenv: config,
  parse: parse,
  populate: populate,
};
