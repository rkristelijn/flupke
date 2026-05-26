const { PassThrough } = require("node:stream");
module.exports = function mergeStream() {
  const output = new PassThrough({ objectMode: true });
  const streams = Array.from(arguments);
  for (const s of streams) s.pipe(output, { end: false });
  let ended = 0;
  for (const s of streams)
    s.on("end", () => {
      if (++ended === streams.length) output.end();
    });
  output.add = (s) => {
    s.pipe(output, { end: false });
    streams.push(s);
    s.on("end", () => {
      if (++ended === streams.length) output.end();
    });
    return output;
  };
  return output;
};
