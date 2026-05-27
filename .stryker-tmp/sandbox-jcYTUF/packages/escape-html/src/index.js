// @ts-nocheck
// Implementation: native-first, zero dependencies
const MATCH = /["'&<>]/;
// Public API
module.exports = function escapeHtml(str) {
  const s = `${str}`;
  const match = MATCH.exec(s);
  if (!match) return s;
  let html = "";
  let last = 0;
  for (let i = match.index; i < s.length; i++) {
    let ch;
    switch (s.charCodeAt(i)) {
      case 34:
        ch = "&quot;";
        break;
      case 38:
        ch = "&amp;";
        break;
      case 39:
        ch = "&#39;";
        break;
      case 60:
        ch = "&lt;";
        break;
      case 62:
        ch = "&gt;";
        break;
      default:
        continue;
    }
    if (last !== i) html += s.substring(last, i);
    html += ch;
    last = i + 1;
  }
  return last !== s.length ? html + s.substring(last) : html;
};
