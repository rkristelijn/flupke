/** @param {Function} ctor @param {Function} superCtor */
module.exports = function inherits(ctor, superCtor) {
  if (superCtor === undefined || superCtor === null) {
    throw new TypeError("The super constructor must not be null or undefined");
  }
  if (typeof superCtor !== "function") {
    throw new TypeError("The super constructor must be a function");
  }
  if (typeof ctor !== "function") {
    throw new TypeError("The constructor must be a function");
  }
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
};
