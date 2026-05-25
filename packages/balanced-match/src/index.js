module.exports = function balanced(a, b, str) {
  if (typeof a !== "string" || typeof b !== "string") {
    throw new TypeError("Expected strings");
  }
  const open = a.length === 1 ? a.charCodeAt(0) : a;
  const close = b.length === 1 ? b.charCodeAt(0) : b;
  let count = 0;
  let min = -1;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c === open || (typeof open === "string" && str[i] === open)) {
      if (count === 0) min = i;
      count++;
    } else if (c === close || (typeof close === "string" && str[i] === close)) {
      count--;
      if (count === 0)
        return {
          start: min,
          end: i + 1,
          pre: str.slice(0, min),
          body: str.slice(min + a.length, i),
          post: str.slice(i + b.length),
        };
    }
  }
  return -1;
};
