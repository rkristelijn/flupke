/**
 * @flupkejs/parent-module — parent-module
 * @see https://www.npmjs.com/package/parent-module
 */
module.exports = function parentModule() {
  const o = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, s) => s;
  const s = new Error().stack;
  Error.prepareStackTrace = o;
  return s[2] ? s[2].getFileName() : undefined;
};
