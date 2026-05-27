// @ts-nocheck
export function parse(
  str: string,
  options?: { decode?: (val: string) => string },
): Record<string, string>;
export function serialize(
  name: string,
  val: string,
  options?: {
    maxAge?: number;
    domain?: string;
    path?: string;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: boolean | string;
    priority?: string;
  },
): string;
