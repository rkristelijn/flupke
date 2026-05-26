import type { IncomingMessage } from "node:http";

declare class Negotiator {
  constructor(req: IncomingMessage);
  mediaType(available?: string[]): string | undefined;
  mediaTypes(available?: string[]): string[];
  language(available?: string[]): string | undefined;
  languages(available?: string[]): string[];
  encoding(available?: string[]): string | undefined;
  encodings(available?: string[]): string[];
  charset(available?: string[]): string | undefined;
  charsets(available?: string[]): string[];
}

export = Negotiator;
