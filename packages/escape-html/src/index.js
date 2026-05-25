/**
 * @flupkejs/escape-html — Drop-in replacement for escape-html
 * @see https://www.npmjs.com/package/escape-html
 */
'use strict';
// Implementation: native-first, zero dependencies
const MATCH = /["'&<>]/;
// Public API
module.exports = function escapeHtml(str) {
  const s = '' + str;
  const match = MATCH.exec(s);
  if (!match) return s;
  let html = '';
  let last = 0;
  for (var i = match.index; i < s.length; i++) {
    let ch;
    switch (s.charCodeAt(i)) {
      case 34: ch = '&quot;'; break;
      case 38: ch = '&amp;'; break;
      case 39: ch = '&#39;'; break;
      case 60: ch = '&lt;'; break;
      case 62: ch = '&gt;'; break;
      default: continue;
    }
    if (last !== i) html += s.substring(last, i);
    html += ch;
    last = i + 1;
  }
  return last !== i ? html + s.substring(last, i) : html;
};
