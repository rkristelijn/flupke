module.exports = { get: function(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  var m = Array.from({length: b.length + 1}, function(_, i) { return i; });
  for (var i = 1; i <= a.length; i++) {
    var prev = i;
    for (var j = 1; j <= b.length; j++) {
      var cur = a[i-1] === b[j-1] ? m[j-1] : Math.min(m[j-1], prev, m[j]) + 1;
      m[j-1] = prev;
      prev = cur;
    }
    m[b.length] = prev;
  }
  return m[b.length];
}};
