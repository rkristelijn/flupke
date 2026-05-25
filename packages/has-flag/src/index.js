// @flupkejs/has-flag
'use strict';
module.exports = function hasFlag(flag) {
  return process.argv.includes('--' + flag);
};