// @ts-nocheck
const { FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env;
const isTTY = process.stdout?.isTTY;

const $ = {
  enabled:
    !NODE_DISABLE_COLORS &&
    NO_COLOR == null &&
    TERM !== "dumb" &&
    ((FORCE_COLOR != null && FORCE_COLOR !== "0") || isTTY),
};

function init(open, close) {
  const o = `\x1b[${open}m`;
  const c = `\x1b[${close}m`;
  return (txt) => {
    if (!$.enabled) return String(txt == null ? "" : txt);
    const s = String(txt == null ? "" : txt);
    if (!s) return s;
    return (
      o +
      (~s.indexOf(c)
        ? s.replace(new RegExp(`\\x1b\\[${close}m`, "g"), c + o)
        : s) +
      c
    );
  };
}

// Modifiers
$.reset = init(0, 0);
$.bold = init(1, 22);
$.dim = init(2, 22);
$.italic = init(3, 23);
$.underline = init(4, 24);
$.inverse = init(7, 27);
$.hidden = init(8, 28);
$.strikethrough = init(9, 29);

// Colors
$.black = init(30, 39);
$.red = init(31, 39);
$.green = init(32, 39);
$.yellow = init(33, 39);
$.blue = init(34, 39);
$.magenta = init(35, 39);
$.cyan = init(36, 39);
$.white = init(37, 39);
$.gray = init(90, 39);
$.grey = init(90, 39);

// Background
$.bgBlack = init(40, 49);
$.bgRed = init(41, 49);
$.bgGreen = init(42, 49);
$.bgYellow = init(43, 49);
$.bgBlue = init(44, 49);
$.bgMagenta = init(45, 49);
$.bgCyan = init(46, 49);
$.bgWhite = init(47, 49);

module.exports = $;
