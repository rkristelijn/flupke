// @ts-nocheck
module.exports = function ansiRegex() {
  return /\x1B\[(?:[0-9;]*[a-zA-Z])?/g;
};
