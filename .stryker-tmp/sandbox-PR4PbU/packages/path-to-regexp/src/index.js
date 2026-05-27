/**
 * Drop-in replacement for path-to-regexp@8.x
 * Implements: parse, compile, match, pathToRegexp, stringify
 */
// @ts-nocheck


const DEFAULT_DELIMITER = "/";

/**
 * Parse a path string into tokens.
 * @param {string} path
 * @returns {{ tokens: Array }}
 */
function parse(path) {
  const tokens = [];
  let i = 0;
  while (i < path.length) {
    const char = path[i];
    if (char === "{") {
      // Optional/group
      let end = path.indexOf("}", i);
      if (end === -1) end = path.length;
      tokens.push({ type: "text", value: path.slice(i + 1, end) });
      i = end + 1;
    } else if (char === ":") {
      // Named parameter
      let name = "";
      let j = i + 1;
      while (j < path.length && /[a-zA-Z0-9_]/.test(path[j])) {
        name += path[j];
        j++;
      }
      let pattern = "[^\\/]+";
      if (j < path.length && path[j] === "(") {
        const end = path.indexOf(")", j);
        pattern = path.slice(j + 1, end);
        j = end + 1;
      }
      tokens.push({ type: "param", name, pattern });
      i = j;
    } else if (char === "*") {
      // Wildcard
      let name = "";
      let j = i + 1;
      while (j < path.length && /[a-zA-Z0-9_]/.test(path[j])) {
        name += path[j];
        j++;
      }
      tokens.push({ type: "wildcard", name: name || "0" });
      i = j;
    } else {
      // Static text
      let text = "";
      let j = i;
      while (
        j < path.length &&
        path[j] !== ":" &&
        path[j] !== "*" &&
        path[j] !== "{"
      ) {
        text += path[j];
        j++;
      }
      tokens.push({ type: "text", value: text });
      i = j;
    }
  }
  return new TokenData(tokens);
}

class TokenData {
  constructor(tokens) {
    this.tokens = tokens;
  }
}

class PathError extends Error {
  constructor(message) {
    super(message);
    this.name = "PathError";
  }
}

/**
 * Convert path to regexp with keys.
 * @param {string|TokenData} path
 * @param {object} [options]
 * @returns {{ regexp: RegExp, keys: Array }}
 */
function pathToRegexp(path, options) {
  const opts = options || {};
  const sensitive = opts.sensitive || false;
  const end = opts.end !== false;
  const trailing = opts.trailing !== false;
  const data = typeof path === "string" ? parse(path) : path;
  const keys = [];
  let pattern = "^";

  for (const token of data.tokens) {
    if (token.type === "text") {
      pattern += escapeRegExp(token.value);
    } else if (token.type === "param") {
      keys.push({ type: "param", name: token.name });
      pattern += `(${token.pattern})`;
    } else if (token.type === "wildcard") {
      keys.push({ type: "param", name: token.name });
      pattern += "(.*)";
    }
  }

  if (trailing) {
    if (end) {
      pattern += "(?:\\/" + ")?$";
    } else {
      pattern += "(?:\\/|$)";
    }
  } else {
    pattern += end ? "$" : "";
  }

  const flags = sensitive ? "" : "i";
  return { regexp: new RegExp(pattern, flags), keys };
}

/**
 * Create a match function.
 * @param {string|TokenData} path
 * @param {object} [options]
 * @returns {function}
 */
function match(path, options) {
  const opts = options || {};
  const { regexp, keys } = pathToRegexp(path, opts);
  const decode = opts.decode || decodeURIComponent;

  return (input) => {
    const m = regexp.exec(input);
    if (!m) return false;
    const params = Object.create(null);
    for (let i = 0; i < keys.length; i++) {
      if (m[i + 1] !== undefined) {
        try {
          params[keys[i].name] = decode(m[i + 1]);
        } catch (e) {
          return false;
        }
      }
    }
    return { path: m[0], params };
  };
}

/**
 * Create a path compiler.
 * @param {string|TokenData} path
 * @param {object} [options]
 * @returns {function}
 */
function compile(path, options) {
  const data = typeof path === "string" ? parse(path) : path;
  const encode = options?.encode || encodeURIComponent;

  return (params) => {
    params = params || {};
    let result = "";
    for (const token of data.tokens) {
      if (token.type === "text") {
        result += token.value;
      } else if (token.type === "param" || token.type === "wildcard") {
        const val = params[token.name];
        if (val == null)
          throw new PathError(`Missing parameter: ${token.name}`);
        result += token.type === "wildcard" ? val : encode(String(val));
      }
    }
    return result;
  };
}

/**
 * Stringify token data back to path string.
 * @param {TokenData} data
 * @returns {string}
 */
function stringify(data) {
  let result = "";
  for (const token of data.tokens) {
    if (token.type === "text") result += token.value;
    else if (token.type === "param") result += `:${token.name}`;
    else if (token.type === "wildcard") result += `*${token.name}`;
  }
  return result;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = {
  TokenData,
  PathError,
  parse,
  compile,
  match,
  pathToRegexp,
  stringify,
};
