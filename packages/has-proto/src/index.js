// @flupkejs/has-proto
'use strict';
module.exports = function hasProto() {
  return '__proto__' in {};
};