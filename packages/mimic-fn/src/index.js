module.exports = function mimicFn(to, from) {
  Object.defineProperties(to, {
    name: { value: from.name },
    length: { value: from.length },
  });
  return to;
};
