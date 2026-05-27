// @ts-nocheck
// Status codes and messages (inlined from statuses)
const STATUS_CODES = {
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
  418: "I'm a Teapot",
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

function toIdentifier(str) {
  return str
    .split(" ")
    .map((p) => p.slice(0, 1).toUpperCase() + p.slice(1))
    .join("")
    .replace(/[^ _0-9a-z]/gi, "");
}

function createError(status, message, props) {
  if (typeof status !== "number") {
    props = message;
    message = status;
    status = 500;
  }
  const msg = message || STATUS_CODES[status] || "Error";
  const err = new Error(msg);
  err.status = status;
  err.statusCode = status;
  err.expose = status < 500;
  if (props) Object.assign(err, props);
  return err;
}

createError.isHttpError = (err) =>
  err instanceof Error &&
  typeof err.status === "number" &&
  err.status >= 400 &&
  err.status < 600;

// Generate named constructors
for (const code in STATUS_CODES) {
  const name = toIdentifier(STATUS_CODES[code]);
  const expose = +code < 500;
  ((c, n, e) => {
    function HttpError(message) {
      this.message = message || STATUS_CODES[c];
      this.status = +c;
      this.statusCode = +c;
      this.expose = e;
    }
    HttpError.prototype = Object.create(Error.prototype);
    HttpError.prototype.constructor = HttpError;
    HttpError.prototype.name = `${n}Error`;
    createError[c] = HttpError;
    createError[n] = HttpError;
  })(code, name, expose);
}

module.exports = createError;
