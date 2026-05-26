/**
 * @flupkejs/strip-indent — strip-indent
 * @see https://www.npmjs.com/package/strip-indent
 */
module.exports = function stripIndent(str) {
  const lines = str.split("\n");
  let indent = Number.POSITIVE_INFINITY;
  for (const line of lines) {
    if (!line.trim()) continue;
    let i = 0;
    while (i < line.length && (line[i] === " " || line[i] === "\t")) i++;
    if (i < indent) indent = i;
  }
  if (indent === 0 || indent === Number.POSITIVE_INFINITY) return str;
  return lines.map((line) => line.slice(indent)).join("\n");
};
