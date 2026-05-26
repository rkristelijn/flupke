const { test } = require("node:test");
const assert = require("node:assert/strict");
const _ = require("../src/index.js");

// Arrays
test("chunk", () => {
  assert.deepEqual(_.chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});
test("compact", () => {
  assert.deepEqual(_.compact([0, 1, false, 2, "", 3]), [1, 2, 3]);
});
test("flatten", () => {
  assert.deepEqual(
    _.flatten([
      [1, 2],
      [3, 4],
    ]),
    [1, 2, 3, 4],
  );
});
test("flattenDeep", () => {
  assert.deepEqual(_.flattenDeep([1, [2, [3, [4]]]]), [1, 2, 3, 4]);
});
test("uniq", () => {
  assert.deepEqual(_.uniq([1, 1, 2, 3, 3]), [1, 2, 3]);
});
test("difference", () => {
  assert.deepEqual(_.difference([1, 2, 3], [2, 3, 4]), [1]);
});
test("intersection", () => {
  assert.deepEqual(_.intersection([1, 2, 3], [2, 3, 4]), [2, 3]);
});
test("take", () => {
  assert.deepEqual(_.take([1, 2, 3], 2), [1, 2]);
});
test("last", () => {
  assert.equal(_.last([1, 2, 3]), 3);
});
test("range", () => {
  assert.deepEqual(_.range(0, 5), [0, 1, 2, 3, 4]);
});
test("sortBy", () => {
  assert.deepEqual(_.sortBy([{ n: 3 }, { n: 1 }, { n: 2 }], "n"), [
    { n: 1 },
    { n: 2 },
    { n: 3 },
  ]);
});
test("groupBy", () => {
  assert.deepEqual(_.groupBy([6.1, 4.2, 6.3], Math.floor), {
    4: [4.2],
    6: [6.1, 6.3],
  });
});
test("keyBy", () => {
  assert.deepEqual(_.keyBy([{ id: "a" }, { id: "b" }], "id"), {
    a: { id: "a" },
    b: { id: "b" },
  });
});

// Objects
test("get", () => {
  assert.equal(_.get({ a: { b: { c: 3 } } }, "a.b.c"), 3);
});
test("get with default", () => {
  assert.equal(_.get({}, "a.b", "def"), "def");
});
test("set", () => {
  const o = {};
  _.set(o, "a.b", 1);
  assert.equal(o.a.b, 1);
});
test("pick", () => {
  assert.deepEqual(_.pick({ a: 1, b: 2, c: 3 }, ["a", "c"]), { a: 1, c: 3 });
});
test("omit", () => {
  assert.deepEqual(_.omit({ a: 1, b: 2, c: 3 }, ["b"]), { a: 1, c: 3 });
});
test("cloneDeep", () => {
  const o = { a: { b: 1 } };
  const c = _.cloneDeep(o);
  c.a.b = 2;
  assert.equal(o.a.b, 1);
});
test("isEqual", () => {
  assert.ok(_.isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }));
  assert.ok(!_.isEqual({ a: 1 }, { a: 2 }));
});
test("isEmpty", () => {
  assert.ok(_.isEmpty({}));
  assert.ok(_.isEmpty([]));
  assert.ok(!_.isEmpty([1]));
});
test("merge", () => {
  assert.deepEqual(_.merge({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
});
test("mapValues", () => {
  assert.deepEqual(
    _.mapValues({ a: 1, b: 2 }, (v) => v * 2),
    { a: 2, b: 4 },
  );
});
test("invert", () => {
  assert.deepEqual(_.invert({ a: "1", b: "2" }), { 1: "a", 2: "b" });
});

// Functions
test("debounce returns function", () => {
  assert.equal(typeof _.debounce(() => {}, 100), "function");
});
test("throttle returns function", () => {
  assert.equal(typeof _.throttle(() => {}, 100), "function");
});
test("once calls once", () => {
  let c = 0;
  const fn = _.once(() => ++c);
  fn();
  fn();
  assert.equal(c, 1);
});
test("memoize caches", () => {
  let c = 0;
  const fn = _.memoize((x) => {
    c++;
    return x * 2;
  });
  fn(5);
  fn(5);
  assert.equal(c, 1);
  assert.equal(fn(5), 10);
});
test("noop", () => {
  assert.equal(_.noop(), undefined);
});
test("identity", () => {
  assert.equal(_.identity(42), 42);
});

// Strings
test("camelCase", () => {
  assert.equal(_.camelCase("hello-world"), "helloWorld");
});
test("kebabCase", () => {
  assert.equal(_.kebabCase("helloWorld"), "hello-world");
});
test("snakeCase", () => {
  assert.equal(_.snakeCase("helloWorld"), "hello_world");
});
test("capitalize", () => {
  assert.equal(_.capitalize("hello"), "Hello");
});

// Type checks
test("isArray", () => {
  assert.ok(_.isArray([]));
  assert.ok(!_.isArray({}));
});
test("isString", () => {
  assert.ok(_.isString("hi"));
  assert.ok(!_.isString(1));
});
test("isNumber", () => {
  assert.ok(_.isNumber(1));
  assert.ok(!_.isNumber(Number.NaN));
});
test("isNil", () => {
  assert.ok(_.isNil(null));
  assert.ok(_.isNil(undefined));
  assert.ok(!_.isNil(0));
});
test("isPlainObject", () => {
  assert.ok(_.isPlainObject({}));
  assert.ok(!_.isPlainObject([]));
});
