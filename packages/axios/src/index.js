/**
 * @flupkejs/axios — Drop-in replacement for axios — uses native fetch()
 * @see https://www.npmjs.com/package/axios
 */
'use strict';
// Vendored from redaxios v0.5.1 (MIT) — https://github.com/developit/redaxios
// 800 bytes, 99% axios-compatible, native fetch under the hood
// Create an axios-compatible instance backed by native fetch
function create(defaults) {
  // Deep merge config objects, lowercase headers
function merge(a, b, lc) {
    var c = {}, k;
    if (Array.isArray(a)) return a.concat(b);
    for (k in a) c[lc ? k.toLowerCase() : k] = a[k];
    for (k in b) { var key = lc ? k.toLowerCase() : k; var v = b[k]; c[key] = key in c && typeof v === 'object' ? merge(c[key], v, key === 'headers') : v; }
    return c;
  }

  // Execute HTTP request using fetch with axios-compatible options
function request(url, config, method, data, _credentials) {
    if (typeof url !== 'string') { config = url; url = config.url; }
    var response = { config: config };
    var opts = merge(defaults, config);
    var headers = {};
    data = data || opts.data;
    (opts.transformRequest || []).forEach(function(fn) { data = fn(data, opts.headers) || data; });
    if (opts.auth) headers.authorization = opts.auth;
    if (data && typeof data === 'object' && typeof data.append !== 'function' && typeof data.text !== 'function') {
      data = JSON.stringify(data);
      headers['content-type'] = 'application/json';
    }
    if (opts.baseURL) url = url.replace(/^(?!.*\/\/)\//, opts.baseURL + '/');
    if (opts.params) url += (~url.indexOf('?') ? '&' : '?') + (opts.paramsSerializer ? opts.paramsSerializer(opts.params) : new URLSearchParams(opts.params));

    return (opts.fetch || fetch)(url, {
      method: (method || opts.method || 'get').toUpperCase(),
      body: data,
      headers: merge(opts.headers, headers, true),
      credentials: opts.withCredentials ? 'include' : _credentials,
      signal: opts.signal
    }).then(function(res) {
      for (var k in res) if (typeof res[k] !== 'function') response[k] = res[k];
      if (opts.responseType === 'stream') { response.data = res.body; return response; }
      return res[opts.responseType || 'text']().then(function(d) {
        response.data = d;
        try { response.data = JSON.parse(d); } catch(e) {}
      }).catch(Object).then(function() {
        return (opts.validateStatus ? opts.validateStatus(res.status) : res.ok) ? response : Promise.reject(response);
      });
    });
  }

  request.request = request;
  request.get = function(u, c) { return request(u, c, 'get'); };
  request.delete = function(u, c) { return request(u, c, 'delete'); };
  request.head = function(u, c) { return request(u, c, 'head'); };
  request.options = function(u, c) { return request(u, c, 'options'); };
  request.post = function(u, d, c) { return request(u, c, 'post', d); };
  request.put = function(u, d, c) { return request(u, c, 'put', d); };
  request.patch = function(u, d, c) { return request(u, c, 'patch', d); };
  request.all = Promise.all.bind(Promise);
  request.spread = function(fn) { return fn.apply.bind(fn, fn); };
  request.CancelToken = typeof AbortController !== 'undefined' ? AbortController : Object;
  request.defaults = defaults;
  request.create = create;
  request.isAxiosError = function(e) { return e && e.config !== undefined && e.status !== undefined; };
  return request;
}

module.exports = create({});
module.exports.default = module.exports;
module.exports.create = create;
