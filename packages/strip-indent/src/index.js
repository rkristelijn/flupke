module.exports = function stripIndent(str) {
  const match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) return str;
  const indent = Math.min(...match.map(s => s.length));
  return str.replace(new RegExp(`^[ \\t]{${indent}}`, 'gm'), '');
};
