module.exports = function concatMap(xs, fn) {
  return xs.flatMap(fn);
};
