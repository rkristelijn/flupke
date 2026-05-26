import type { Stream } from "node:stream";
declare function destroy<T extends Stream>(stream: T): T;
export = destroy;
