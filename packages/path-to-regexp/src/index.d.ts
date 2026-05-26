export class TokenData {
  tokens: Array<{
    type: string;
    name?: string;
    value?: string;
    pattern?: string;
  }>;
  constructor(
    tokens: Array<{
      type: string;
      name?: string;
      value?: string;
      pattern?: string;
    }>,
  );
}

export class PathError extends Error {}

export interface MatchResult {
  path: string;
  params: Record<string, string>;
}

export interface Key {
  type: string;
  name: string;
}

export interface PathToRegexpResult {
  regexp: RegExp;
  keys: Key[];
}

export interface MatchOptions {
  sensitive?: boolean;
  end?: boolean;
  trailing?: boolean;
  decode?: (value: string) => string;
}

export function parse(path: string): TokenData;
export function compile(
  path: string | TokenData,
  options?: { encode?: (value: string) => string },
): (params?: Record<string, string | number>) => string;
export function match(
  path: string | TokenData,
  options?: MatchOptions,
): (input: string) => MatchResult | false;
export function pathToRegexp(
  path: string | TokenData,
  options?: MatchOptions,
): PathToRegexpResult;
export function stringify(data: TokenData): string;
