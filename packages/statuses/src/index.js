// HTTP status codes and messages
const STATUS_CODES = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended",
  511: "Network Authentication Required",
};

// Redirect status codes
const REDIRECT = {
  300: true,
  301: true,
  302: true,
  303: true,
  304: true,
  305: true,
  307: true,
  308: true,
};

// Empty body status codes
const EMPTY = {
  204: true,
  205: true,
  304: true,
};

// Retryable status codes
const RETRY = {
  408: true,
  429: true,
  500: true,
  502: true,
  503: true,
  504: true,
};

/**
 * Get status message for code, or get code for status message.
 * @param {number|string} code - Status code or message
 * @returns {number|string} The corresponding message or code
 */
function statuses(code) {
  if (typeof code === "number") {
    return STATUS_CODES[code] || null;
  }
  if (typeof code === "string") {
    const lowerCode = code.toLowerCase();
    for (const [key, value] of Object.entries(STATUS_CODES)) {
      if (value.toLowerCase() === lowerCode) {
        return Number.parseInt(key, 10);
      }
    }
    return null;
  }
  throw new TypeError("argument code must be a number or string");
}

// Add static properties
statuses.message = STATUS_CODES;
statuses.code = Object.fromEntries(
  Object.entries(STATUS_CODES).map(([k, v]) => [
    v.toLowerCase(),
    Number.parseInt(k, 10),
  ]),
);
statuses.redirect = REDIRECT;
statuses.empty = EMPTY;
statuses.retry = RETRY;

module.exports = statuses;
