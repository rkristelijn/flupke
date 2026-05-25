/**
 * @flupkejs/get-caller-file — get-caller-file
 * @see https://www.npmjs.com/package/get-caller-file
 */
module.exports = function getCallerFile(pos = 2) {
  const o = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, s) => s;
  const s = new Error().stack;
  Error.prepareStackTrace = o;
  return s[pos] ? s[pos].getFileName() : undefined;
};
