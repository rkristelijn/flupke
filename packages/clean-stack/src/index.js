// @flupkejs/clean-stack
module.exports = function cleanStack(stack) {
  return stack
    .split("\n")
    .filter((l) => !l.includes("node_modules") && !l.includes("internal/"))
    .join("\n");
};
