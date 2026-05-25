'use strict';
var fs = require('node:fs');
var path = require('node:path');

function parse(src) {
  var obj = {};
  var lines = src.toString().replace(/\r\n?/g, '\n').split('\n');
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line || line[0] === '#') continue;
    var idx = line.indexOf('=');
    if (idx === -1) continue;
    var key = line.slice(0, idx).trim();
    var val = line.slice(idx + 1).trim();
    if ((val[0] === '"' && val[val.length-1] === '"') || (val[0] === "'" && val[val.length-1] === "'")) {
      val = val.slice(1, -1);
    }
    val = val.replace(/\\n/g, '\n');
    obj[key] = val;
  }
  return obj;
}

function config(options) {
  var dotenvPath = (options && options.path) || path.resolve(process.cwd(), '.env');
  var encoding = (options && options.encoding) || 'utf8';
  var override = options && options.override;
  try {
    var src = fs.readFileSync(dotenvPath, { encoding: encoding });
    var parsed = parse(src);
    populate(process.env, parsed, { override: override });
    return { parsed: parsed };
  } catch (e) {
    return { error: e };
  }
}

function populate(target, source, options) {
  var override = options && options.override;
  for (var key in source) {
    if (override || !(key in target)) {
      target[key] = source[key];
    }
  }
}

module.exports = { config: config, configDotenv: config, parse: parse, populate: populate };
