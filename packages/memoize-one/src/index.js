/**
 * @flupkejs/memoize-one — memoize-one
 * @see https://www.npmjs.com/package/memoize-one
 */
module.exports = function memoizeOne(fn) {
  let lastArgs;
  let lastResult;
  let called = false;
  return function (...args) {
    if (
      called &&
      args.length === lastArgs.length &&
      args.every((a, i) => a === lastArgs[i])
    )
      return lastResult;
    lastArgs = args;
    lastResult = fn.apply(this, args);
    called = true;
    return lastResult;
  };
};
