import type { PassThrough } from "node:stream";
declare function mergeStream(
  ...streams: NodeJS.ReadableStream[]
): PassThrough & { add(s: NodeJS.ReadableStream): PassThrough };
export = mergeStream;
