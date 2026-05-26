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
