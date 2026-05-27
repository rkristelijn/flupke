/**
 * @flupkejs/yargs-parser — yargs-parser
 * @see https://www.npmjs.com/package/yargs-parser
 */
// @ts-nocheck

module.exports = function yargsParser(args) {
  if (typeof args === "string") args = args.split(/\s+/);
  const result = { _: [] };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--") {
      result._.push(...args.slice(i + 1));
      break;
    }
    if (arg.startsWith("--no-")) {
      result[arg.slice(5)] = false;
    } else if (arg.startsWith("--")) {
      const [key, ...val] = arg.slice(2).split("=");
      result[key] = val.length
        ? val.join("=")
        : args[i + 1] && !args[i + 1].startsWith("-")
          ? args[++i]
          : true;
    } else if (arg.startsWith("-") && arg.length > 1) {
      const chars = arg.slice(1);
      // Index needed: checks last-char position and mutates outer loop index
      for (let j = 0; j < chars.length; j++) {
        if (
          j === chars.length - 1 &&
          args[i + 1] &&
          !args[i + 1].startsWith("-")
        ) {
          result[chars[j]] = args[++i];
        } else {
          result[chars[j]] = true;
        }
      }
    } else {
      result._.push(arg);
    }
  }
  return result;
};
