// @ts-nocheck
module.exports = function pify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, ...res) =>
        err ? reject(err) : resolve(res.length > 1 ? res : res[0]),
      );
    });
};
