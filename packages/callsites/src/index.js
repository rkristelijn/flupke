/**
 * @flupkejs/callsites — callsites
 * @see https://www.npmjs.com/package/callsites
 */
module.exports = function callsites() {
  const o = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, s) => s;
  const s = new Error().stack;
  Error.prepareStackTrace = o;
  return s.slice(1);
};
