const enabled = process.env.NO_COLOR == null && process.env.FORCE_COLOR !== "0";
const f = enabled
  ? (o, c) => (s) => `\x1b[${o}m${s}\x1b[${c}m`
  : () => (s) => s;
module.exports = {
  isColorSupported: enabled,
  reset: f(0, 0),
  bold: f(1, 22),
  dim: f(2, 22),
  italic: f(3, 23),
  underline: f(4, 24),
  inverse: f(7, 27),
  hidden: f(8, 28),
  strikethrough: f(9, 29),
  black: f(30, 39),
  red: f(31, 39),
  green: f(32, 39),
  yellow: f(33, 39),
  blue: f(34, 39),
  magenta: f(35, 39),
  cyan: f(36, 39),
  white: f(37, 39),
  gray: f(90, 39),
  bgBlack: f(40, 49),
  bgRed: f(41, 49),
  bgGreen: f(42, 49),
  bgYellow: f(43, 49),
  bgBlue: f(44, 49),
  bgMagenta: f(45, 49),
  bgCyan: f(46, 49),
  bgWhite: f(47, 49),
};
