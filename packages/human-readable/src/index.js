/**
 * @flupkejs/human-readable — human-readable
 * @see https://www.npmjs.com/package/human-readable
 */
const UNITS = ["B", "KB", "MB", "GB", "TB", "PB"];
module.exports = function humanReadable(bytes) {
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(i > 0 ? 1 : 0)} ${UNITS[i]}`;
};
