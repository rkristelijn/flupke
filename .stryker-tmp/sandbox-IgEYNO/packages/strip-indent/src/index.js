/**
 * @flupkejs/strip-indent — strip-indent
 * @see https://www.npmjs.com/package/strip-indent
 */
// @ts-nocheck

module.exports = function stripIndent(str) {
  const lines = str.split("\n");
  let indent = Infinity;
  for (const line of lines) {
    if (!line.trim()) continue;
    let i = 0;
    while (i < line.length && (line[i] === " " || line[i] === "\t")) i++;
    if (i < indent) indent = i;
  }
  if (indent === 0 || indent === Infinity) return str;
  return lines.map((line) => line.slice(indent)).join("\n");
};
