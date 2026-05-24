'use strict';

class AxiosError extends Error {
  constructor(message, code, config, response) {
    super(message);
    this.name = 'AxiosError';
    this.code = code;
    this.config = config;
    this.response = response;
    this.isAxiosError = true;
  }
}

function createInstance(defaults) {
  var interceptors = { request: createInterceptorManager(), response: createInterceptorManager() };

  async function axios(configOrUrl, config) {
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = Object.assign({}, defaults, config);

    var url = config.baseURL ? config.baseURL.replace(/\/$/, '') + '/' + (config.url || '').replace(/^\//, '') : config.url;
    var method = (config.method || 'get').toUpperCase();
    var headers = new Headers(config.headers || {});
    var body = undefined;

    if (config.data) {
      if (typeof config.data === 'object' && !(config.data instanceof FormData)) {
        body = JSON.stringify(config.data);
        if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
      } else {
        body = config.data;
      }
    }

    if (config.params) {
      var params = new URLSearchParams(config.params).toString();
      url += (url.includes('?') ? '&' : '?') + params;
    }

    // Run request interceptors
    for (var i = 0; i < interceptors.request.handlers.length; i++) {
      var h = interceptors.request.handlers[i];
      if (h) config = (await h.fulfilled(config)) || config;
    }

    var fetchOpts = { method: method, headers: headers, body: body, signal: config.signal };
    if (config.timeout) {
      var controller = new AbortController();
      fetchOpts.signal = controller.signal;
      setTimeout(function() { controller.abort(); }, config.timeout);
    }

    var res;
    try {
      res = await fetch(url, fetchOpts);
    } catch (err) {
      throw new AxiosError(err.message, 'ERR_NETWORK', config, null);
    }

    var responseData;
    var contentType = res.headers.get('content-type') || '';
    if (config.responseType === 'arraybuffer') responseData = await res.arrayBuffer();
    else if (config.responseType === 'blob') responseData = await res.blob();
    else if (contentType.includes('json')) responseData = await res.json();
    else responseData = await res.text();

    var response = {
      data: responseData,
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
      config: config
    };

    // Run response interceptors
    for (var i = 0; i < interceptors.response.handlers.length; i++) {
      var h = interceptors.response.handlers[i];
      if (h) response = (await h.fulfilled(response)) || response;
    }

    if (res.ok || (config.validateStatus && config.validateStatus(res.status))) return response;
    throw new AxiosError('Request failed with status ' + res.status, 'ERR_BAD_REQUEST', config, response);
  }

  axios.defaults = defaults;
  axios.interceptors = interceptors;
  axios.get = function(url, config) { return axios(Object.assign({}, config, { url: url, method: 'get' })); };
  axios.post = function(url, data, config) { return axios(Object.assign({}, config, { url: url, method: 'post', data: data })); };
  axios.put = function(url, data, config) { return axios(Object.assign({}, config, { url: url, method: 'put', data: data })); };
  axios.patch = function(url, data, config) { return axios(Object.assign({}, config, { url: url, method: 'patch', data: data })); };
  axios.delete = function(url, config) { return axios(Object.assign({}, config, { url: url, method: 'delete' })); };
  axios.head = function(url, config) { return axios(Object.assign({}, config, { url: url, method: 'head' })); };
  axios.create = function(cfg) { return createInstance(Object.assign({}, defaults, cfg)); };
  axios.isAxiosError = function(e) { return e && e.isAxiosError === true; };
  axios.AxiosError = AxiosError;
  axios.all = Promise.all.bind(Promise);
  axios.spread = function(fn) { return function(arr) { return fn.apply(null, arr); }; };

  return axios;
}

function createInterceptorManager() {
  var mgr = { handlers: [] };
  mgr.use = function(fulfilled, rejected) { mgr.handlers.push({ fulfilled: fulfilled, rejected: rejected }); return mgr.handlers.length - 1; };
  mgr.eject = function(id) { mgr.handlers[id] = null; };
  return mgr;
}

module.exports = createInstance({});
module.exports.default = module.exports;
