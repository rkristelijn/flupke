const ansiRegex = /\x1b\[[0-9;]*m/g;
const isFW = (cp) => cp >= 0x1100 && (cp <= 0x115f || cp === 0x2329 || cp === 0x232a || (cp >= 0x2e80 && cp <= 0xa4cf && cp !== 0x303f) || (cp >= 0xac00 && cp <= 0xd7a3) || (cp >= 0xf900 && cp <= 0xfaff) || (cp >= 0xfe10 && cp <= 0xfe6f) || (cp >= 0xff01 && cp <= 0xff60) || (cp >= 0xffe0 && cp <= 0xffe6) || (cp >= 0x1f300 && cp <= 0x1f9ff) || (cp >= 0x20000 && cp <= 0x2fffd));
module.exports = function stringWidth(str) {
  str = str.replace(ansiRegex, '');
  let w = 0;
  for (const ch of str) { w += isFW(ch.codePointAt(0)) ? 2 : 1; }
  return w;
};
