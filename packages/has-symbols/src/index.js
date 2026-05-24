'use strict';
module.exports = function hasSymbols() {
  return typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
};