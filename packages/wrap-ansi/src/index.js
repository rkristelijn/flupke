/**
 * @flupkejs/wrap-ansi — wrap-ansi
 * @see https://www.npmjs.com/package/wrap-ansi
 */
const ansiRegex = /\x1b\[[0-9;]*m/g;
module.exports = function wrapAnsi(str, cols) {
  const lines = [];
  for (const line of str.split('\n')) {
    const plain = line.replace(ansiRegex, '');
    if (plain.length <= cols) { lines.push(line); continue; }
    let cur = '', w = 0;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '\x1b') { const m = line.slice(i).match(/^\x1b\[[0-9;]*m/); if (m) { cur += m[0]; i += m[0].length - 1; continue; } }
      if (w >= cols) { lines.push(cur); cur = ''; w = 0; }
      cur += ch; w++;
    }
    if (cur) lines.push(cur);
  }
  return lines.join('\n');
};
