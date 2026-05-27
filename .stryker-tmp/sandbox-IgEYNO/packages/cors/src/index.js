// @ts-nocheck
const defaults = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

function isOriginAllowed(origin, allowed) {
  if (Array.isArray(allowed))
    return allowed.some((a) => isOriginAllowed(origin, a));
  if (typeof allowed === "string") return origin === allowed;
  if (allowed instanceof RegExp) return allowed.test(origin);
  return !!allowed;
}

function configureOrigin(opts, req) {
  const origin = req.headers.origin;
  if (!opts.origin || opts.origin === "*")
    return { "Access-Control-Allow-Origin": "*" };
  if (typeof opts.origin === "string")
    return { "Access-Control-Allow-Origin": opts.origin, Vary: "Origin" };
  if (isOriginAllowed(origin, opts.origin))
    return { "Access-Control-Allow-Origin": origin, Vary: "Origin" };
  return { "Access-Control-Allow-Origin": "false", Vary: "Origin" };
}

function cors(options) {
  const opts =
    typeof options === "function" ? null : { ...defaults, ...options };

  return function corsMiddleware(req, res, next) {
    function apply(o) {
      const cfg = { ...defaults, ...o };
      const headers = configureOrigin(cfg, req);

      if (cfg.credentials) headers["Access-Control-Allow-Credentials"] = "true";
      if (cfg.exposedHeaders)
        headers["Access-Control-Expose-Headers"] = Array.isArray(
          cfg.exposedHeaders,
        )
          ? cfg.exposedHeaders.join(",")
          : cfg.exposedHeaders;

      if (req.method === "OPTIONS") {
        headers["Access-Control-Allow-Methods"] = Array.isArray(cfg.methods)
          ? cfg.methods.join(",")
          : cfg.methods;
        if (cfg.allowedHeaders)
          headers["Access-Control-Allow-Headers"] = Array.isArray(
            cfg.allowedHeaders,
          )
            ? cfg.allowedHeaders.join(",")
            : cfg.allowedHeaders;
        else if (req.headers["access-control-request-headers"]) {
          headers["Access-Control-Allow-Headers"] =
            req.headers["access-control-request-headers"];
          headers.Vary = headers.Vary
            ? `${headers.Vary}, Access-Control-Request-Headers`
            : "Access-Control-Request-Headers";
        }
        if (cfg.maxAge) headers["Access-Control-Max-Age"] = String(cfg.maxAge);
        for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
        if (cfg.preflightContinue) return next();
        res.statusCode = cfg.optionsSuccessStatus;
        res.setHeader("Content-Length", "0");
        return res.end();
      }

      for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
      return next();
    }

    if (typeof options === "function")
      options(req, (err, o) => {
        if (err) return next(err);
        apply(o);
      });
    else apply(opts);
  };
}

module.exports = cors;
