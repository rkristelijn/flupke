// Vendored from redaxios v0.5.1 (MIT) — https://github.com/developit/redaxios
// 800 bytes, 99% axios-compatible, native fetch under the hood
// Create an axios-compatible instance backed by native fetch
function create(defaults) {
  // Deep merge config objects, lowercase headers
  function merge(a, b, lc) {
    const c = {};
    let k;
    if (Array.isArray(a)) return a.concat(b);
    for (k in a) c[lc ? k.toLowerCase() : k] = a[k];
    for (k in b) {
      const key = lc ? k.toLowerCase() : k;
      const v = b[k];
      c[key] =
        key in c && typeof v === "object"
          ? merge(c[key], v, key === "headers")
          : v;
    }
    return c;
  }

  // Execute HTTP request using fetch with axios-compatible options
  function request(url, config, method, data, _credentials) {
    if (typeof url !== "string") {
      config = url;
      url = config.url;
    }
    const response = { config: config };
    const opts = merge(defaults, config);
    const headers = {};
    data = data || opts.data;
    (opts.transformRequest || []).forEach((fn) => {
      data = fn(data, opts.headers) || data;
    });
    if (opts.auth) headers.authorization = opts.auth;
    if (
      data &&
      typeof data === "object" &&
      typeof data.append !== "function" &&
      typeof data.text !== "function"
    ) {
      data = JSON.stringify(data);
      headers["content-type"] = "application/json";
    }
    if (opts.baseURL && !url.includes("//"))
      url = `${opts.baseURL.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
    if (opts.params)
      url +=
        (~url.indexOf("?") ? "&" : "?") +
        (opts.paramsSerializer
          ? opts.paramsSerializer(opts.params)
          : new URLSearchParams(opts.params));

    return (opts.fetch || fetch)(url, {
      method: (method || opts.method || "get").toUpperCase(),
      body: data,
      headers: merge(opts.headers, headers, true),
      credentials: opts.withCredentials ? "include" : _credentials,
      signal: opts.signal,
    }).then((res) => {
      for (const k in res)
        if (typeof res[k] !== "function") response[k] = res[k];
      if (opts.responseType === "stream") {
        response.data = res.body;
        return response;
      }
      return res[opts.responseType || "text"]()
        .then((d) => {
          response.data = d;
          try {
            response.data = JSON.parse(d);
          } catch (e) {}
        })
        .catch(Object)
        .then(() =>
          (opts.validateStatus ? opts.validateStatus(res.status) : res.ok)
            ? response
            : Promise.reject(response),
        );
    });
  }

  request.request = request;
  request.defaults = defaults;
  request.interceptors = {
    request: createInterceptorMgr(),
    response: createInterceptorMgr(),
  };
  request.get = (u, c) => request(u, c, "get");
  request.delete = (u, c) => request(u, c, "delete");
  request.head = (u, c) => request(u, c, "head");
  request.options = (u, c) => request(u, c, "options");
  request.post = (u, d, c) => request(u, c, "post", d);
  request.put = (u, d, c) => request(u, c, "put", d);
  request.patch = (u, d, c) => request(u, c, "patch", d);
  request.all = Promise.all.bind(Promise);
  request.spread = (fn) => fn.apply.bind(fn, fn);
  request.CancelToken =
    typeof AbortController !== "undefined" ? AbortController : Object;
  request.defaults = defaults;
  request.create = create;
  request.isAxiosError = (e) =>
    e && e.config !== undefined && e.status !== undefined;
  return request;
}

function createInterceptorMgr() {
  const h = [];
  return {
    use: (f, r) => {
      h.push({ fulfilled: f, rejected: r });
      return h.length - 1;
    },
    eject: (id) => {
      h[id] = null;
    },
    handlers: h,
  };
}

module.exports = create({});
module.exports.default = module.exports;
module.exports.create = create;
