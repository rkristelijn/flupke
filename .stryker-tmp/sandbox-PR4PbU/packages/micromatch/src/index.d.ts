// @ts-nocheck
interface Options {
  nocase?: boolean;
}

declare function micromatch(
  list: string[],
  patterns: string | string[],
  options?: Options,
): string[];

declare namespace micromatch {
  function isMatch(
    str: string,
    pattern: string | string[],
    options?: Options,
  ): boolean;
  function not(
    list: string[],
    patterns: string | string[],
    options?: Options,
  ): string[];
  function match(
    list: string[],
    patterns: string | string[],
    options?: Options,
  ): string[];
  function contains(str: string, pattern: string, options?: Options): boolean;
  function makeRe(pattern: string, options?: Options): RegExp;
  function braces(pattern: string, options?: { expand?: boolean }): string[];
}

export = micromatch;
