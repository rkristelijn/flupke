// @ts-nocheck
import type { Readable } from "node:stream";
declare function getStream(stream: Readable): Promise<string>;
declare namespace getStream {
  function buffer(stream: Readable): Promise<Buffer>;
}
export = getStream;
