/**
 * @flupkejs/depd — Drop-in replacement for depd
 * @see https://www.npmjs.com/package/depd
 */
'use strict';
var util = require('node:util');
/** Create a deprecation warning function for a namespace */
module.exports = function depd(namespace) {
  var warned = Object.create(null);
  function deprecate(message) {
    if (warned[message]) return;
    warned[message] = true;
    if (typeof process !== 'undefined' && process.noDeprecation) return;
    console.warn(namespace + ': ' + message + ' is deprecated');
  }
  deprecate.function = function(fn, message) {
    return util.deprecate(fn, namespace + ': ' + (message || fn.name + ' is deprecated'));
  };
  deprecate.property = function(obj, prop, message) {
    var val = obj[prop];
    Object.defineProperty(obj, prop, {
      configurable: true,
      get: function() { deprecate(message || prop); return val; },
      set: function(v) { val = v; }
    });
  };
  return deprecate;
};
