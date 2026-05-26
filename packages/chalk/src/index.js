const { FORCE_COLOR, NO_COLOR, TERM } = process.env;
const isTTY = process.stdout?.isTTY;
const level =
  NO_COLOR != null
    ? 0
    : FORCE_COLOR != null
      ? FORCE_COLOR === "0"
        ? 0
        : 3
      : TERM === "dumb"
        ? 0
        : isTTY
          ? 3
          : 0;

const styles = {
  reset: [0, 0],
  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39],
  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],
  blackBright: [90, 39],
  redBright: [91, 39],
  greenBright: [92, 39],
  yellowBright: [93, 39],
  blueBright: [94, 39],
  magentaBright: [95, 39],
  cyanBright: [96, 39],
  whiteBright: [97, 39],
  bgBlackBright: [100, 49],
  bgRedBright: [101, 49],
  bgGreenBright: [102, 49],
  bgYellowBright: [103, 49],
  bgBlueBright: [104, 49],
  bgMagentaBright: [105, 49],
  bgCyanBright: [106, 49],
  bgWhiteBright: [107, 49],
};

function createChalk(parentCodes = []) {
  const chalk = (...args) => {
    const str = args.join(" ");
    if (!level || !parentCodes.length) return str;
    let open = "";
    let close = "";
    for (const [o, c] of parentCodes) {
      open += `\x1b[${o}m`;
      close = `\x1b[${c}m${close}`;
    }
    return (
      open +
      str.replace(
        new RegExp(
          `\\x1b\\[(?:${parentCodes.map(([, c]) => c).join("|")})m`,
          "g",
        ),
        (m) => m + open,
      ) +
      close
    );
  };

  for (const [name, codes] of Object.entries(styles)) {
    Object.defineProperty(chalk, name, {
      get() {
        return createChalk([...parentCodes, codes]);
      },
      enumerable: true,
    });
  }

  chalk.rgb = (r, g, b) =>
    createChalk([...parentCodes, [`38;2;${r};${g};${b}`, 39]]);
  chalk.bgRgb = (r, g, b) =>
    createChalk([...parentCodes, [`48;2;${r};${g};${b}`, 49]]);
  chalk.hex = (hex) => {
    const [r, g, b] = hexToRgb(hex);
    return chalk.rgb(r, g, b);
  };
  chalk.bgHex = (hex) => {
    const [r, g, b] = hexToRgb(hex);
    return chalk.bgRgb(r, g, b);
  };
  chalk.visible = (...args) => (level ? chalk(...args) : "");
  chalk.level = level;

  return chalk;
}

function hexToRgb(hex) {
  const h = hex.replace(/^#/, "");
  const n = Number.parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const chalk = createChalk();
chalk.supportsColor = {
  level,
  hasBasic: level >= 1,
  has256: level >= 2,
  has16m: level >= 3,
};

module.exports = chalk;
module.exports.default = chalk;
