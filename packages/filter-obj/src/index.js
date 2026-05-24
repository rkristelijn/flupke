module.exports = function filterObj(obj, fn) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) { if (fn(key, value, obj)) result[key] = value; }
  return result;
};
