module.exports =
  Object.hasOwn ||
  ((obj, key) => Object.prototype.hasOwnProperty.call(obj, key));
