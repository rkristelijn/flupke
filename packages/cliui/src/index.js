module.exports = function cliui(opts = {}) {
  const width = opts.width || 80;
  const rows = [];
  return {
    div(...cols) {
      const colW = Math.floor(width / cols.length);
      const line = cols.map(c => {
        const text = typeof c === 'string' ? c : c.text || '';
        return text.padEnd(colW).slice(0, colW);
      }).join('');
      rows.push(line);
    },
    span(...cols) { this.div(...cols); },
    toString() { return rows.join('\n'); }
  };
};
