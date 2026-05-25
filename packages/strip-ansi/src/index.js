/**
 * @flupkejs/strip-ansi — Strip ANSI escape codes
 * @see https://www.npmjs.com/package/strip-ansi
 */
'use strict';
module.exports = function stripAnsi(str) {
  const regex = /\x1B\[(?:[0-9;]*[a-zA-Z])?/g;
  return str.replace(regex, '');
};