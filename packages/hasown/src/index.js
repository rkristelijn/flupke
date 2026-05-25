// @flupkejs/hasown
'use strict';
module.exports = Object.hasOwn || function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};