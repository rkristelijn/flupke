// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const cors = require("../src/index.js");

function mockReq(method = "GET", headers = {}) {
  return { method, headers: { origin: "http://example.com", ...headers } };
}

function mockRes() {
  const h = {};
  return {
    headers: h,
    statusCode: 200,
    setHeader(k, v) {
      h[k] = v;
    },
    end() {
      this.ended = true;
    },
    ended: false,
  };
}

test("default allows all origins", (t, done) => {
  const mw = cors();
  const res = mockRes();
  mw(mockReq(), res, () => {
    assert.strictEqual(res.headers["Access-Control-Allow-Origin"], "*");
    done();
  });
});

test("specific origin", (t, done) => {
  const mw = cors({ origin: "http://example.com" });
  const res = mockRes();
  mw(mockReq(), res, () => {
    assert.strictEqual(
      res.headers["Access-Control-Allow-Origin"],
      "http://example.com",
    );
    done();
  });
});

test("regex origin", (t, done) => {
  const mw = cors({ origin: /example\.com$/ });
  const res = mockRes();
  mw(mockReq(), res, () => {
    assert.strictEqual(
      res.headers["Access-Control-Allow-Origin"],
      "http://example.com",
    );
    done();
  });
});

test("array origin", (t, done) => {
  const mw = cors({ origin: ["http://foo.com", "http://example.com"] });
  const res = mockRes();
  mw(mockReq(), res, () => {
    assert.strictEqual(
      res.headers["Access-Control-Allow-Origin"],
      "http://example.com",
    );
    done();
  });
});

test("preflight OPTIONS", (t, done) => {
  const mw = cors();
  const res = mockRes();
  mw(mockReq("OPTIONS"), res, () => {
    assert.fail("should not call next");
  });
  assert.strictEqual(res.statusCode, 204);
  assert.strictEqual(res.ended, true);
  assert.strictEqual(
    res.headers["Access-Control-Allow-Methods"],
    "GET,HEAD,PUT,PATCH,POST,DELETE",
  );
  done();
});

test("credentials", (t, done) => {
  const mw = cors({ credentials: true });
  const res = mockRes();
  mw(mockReq(), res, () => {
    assert.strictEqual(res.headers["Access-Control-Allow-Credentials"], "true");
    done();
  });
});

test("preflightContinue", (t, done) => {
  const mw = cors({ preflightContinue: true });
  const res = mockRes();
  mw(mockReq("OPTIONS"), res, () => {
    assert.strictEqual(res.ended, false);
    done();
  });
});

test("dynamic origin via function", (t, done) => {
  const mw = cors((req, cb) => cb(null, { origin: true }));
  const res = mockRes();
  mw(mockReq(), res, () => {
    assert.strictEqual(
      res.headers["Access-Control-Allow-Origin"],
      "http://example.com",
    );
    done();
  });
});

test("maxAge", (t, done) => {
  const mw = cors({ maxAge: 3600 });
  const res = mockRes();
  mw(mockReq("OPTIONS"), res, () => {
    assert.fail();
  });
  assert.strictEqual(res.headers["Access-Control-Max-Age"], "3600");
  done();
});

test("exposedHeaders", (t, done) => {
  const mw = cors({ exposedHeaders: ["X-Foo", "X-Bar"] });
  const res = mockRes();
  mw(mockReq(), res, () => {
    assert.strictEqual(
      res.headers["Access-Control-Expose-Headers"],
      "X-Foo,X-Bar",
    );
    done();
  });
});

test("default methods header", (t, done) => {
  const mw = cors();
  const res = mockRes();
  mw(mockReq("OPTIONS"), res, () => {});
  assert.strictEqual(res.headers["Access-Control-Allow-Methods"], "GET,HEAD,PUT,PATCH,POST,DELETE");
  done();
});

test("custom methods array", (t, done) => {
  const mw = cors({ methods: ["GET", "POST"] });
  const res = mockRes();
  mw(mockReq("OPTIONS"), res, () => {});
  assert.strictEqual(res.headers["Access-Control-Allow-Methods"], "GET,POST");
  done();
});

test("allowedHeaders from request", (t, done) => {
  const mw = cors();
  const res = mockRes();
  mw(mockReq("OPTIONS", { "access-control-request-headers": "X-Custom" }), res, () => {});
  assert.strictEqual(res.headers["Access-Control-Allow-Headers"], "X-Custom");
  done();
});

test("custom allowedHeaders", (t, done) => {
  const mw = cors({ allowedHeaders: ["Content-Type", "Authorization"] });
  const res = mockRes();
  mw(mockReq("OPTIONS"), res, () => {});
  assert.strictEqual(res.headers["Access-Control-Allow-Headers"], "Content-Type,Authorization");
  done();
});

test("origin false when not allowed", (t, done) => {
  const mw = cors({ origin: "http://other.com" });
  const res = mockRes();
  mw(mockReq(), res, () => {
    assert.strictEqual(res.headers["Access-Control-Allow-Origin"], "http://other.com");
    done();
  });
});

test("origin rejected returns false", (t, done) => {
  const mw = cors({ origin: /^http:\/\/foo\.com$/ });
  const res = mockRes();
  mw(mockReq("GET", { origin: "http://bar.com" }), res, () => {
    assert.strictEqual(res.headers["Access-Control-Allow-Origin"], "false");
    done();
  });
});

test("Vary header set for non-wildcard origin", (t, done) => {
  const mw = cors({ origin: "http://example.com" });
  const res = mockRes();
  mw(mockReq(), res, () => {
    assert.strictEqual(res.headers["Vary"], "Origin");
    done();
  });
});

test("no Vary for wildcard origin", (t, done) => {
  const mw = cors();
  const res = mockRes();
  mw(mockReq(), res, () => {
    assert.strictEqual(res.headers["Vary"], undefined);
    done();
  });
});

test("optionsSuccessStatus default 204", (t, done) => {
  const mw = cors();
  const res = mockRes();
  mw(mockReq("OPTIONS"), res, () => {});
  assert.strictEqual(res.statusCode, 204);
  done();
});

test("custom optionsSuccessStatus", (t, done) => {
  const mw = cors({ optionsSuccessStatus: 200 });
  const res = mockRes();
  mw(mockReq("OPTIONS"), res, () => {});
  assert.strictEqual(res.statusCode, 200);
  done();
});

test("Content-Length 0 on preflight", (t, done) => {
  const mw = cors();
  const res = mockRes();
  mw(mockReq("OPTIONS"), res, () => {});
  assert.strictEqual(res.headers["Content-Length"], "0");
  done();
});

test("non-OPTIONS sets headers and calls next", (t, done) => {
  const mw = cors({ credentials: true });
  const res = mockRes();
  mw(mockReq("GET"), res, () => {
    assert.strictEqual(res.headers["Access-Control-Allow-Credentials"], "true");
    assert.strictEqual(res.ended, false);
    done();
  });
});

test("error in dynamic origin calls next with error", (t, done) => {
  const mw = cors((req, cb) => cb(new Error("fail")));
  const res = mockRes();
  mw(mockReq(), res, (err) => {
    assert.strictEqual(err.message, "fail");
    done();
  });
});
