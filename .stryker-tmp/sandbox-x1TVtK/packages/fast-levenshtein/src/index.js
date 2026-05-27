// @ts-nocheck
module.exports = {
  get: (a, b) => {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const m = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let prev = i;
      for (let j = 1; j <= b.length; j++) {
        const cur =
          a[i - 1] === b[j - 1] ? m[j - 1] : Math.min(m[j - 1], prev, m[j]) + 1;
        m[j - 1] = prev;
        prev = cur;
      }
      m[b.length] = prev;
    }
    return m[b.length];
  },
};
