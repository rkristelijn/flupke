module.exports = function onetime(fn) {
  let called = false;
  let result;
  const f = function (...a) {
    if (!called) {
      called = true;
      result = fn.apply(this, a);
    }
    return result;
  };
  f.called = () => called;
  return f;
};
