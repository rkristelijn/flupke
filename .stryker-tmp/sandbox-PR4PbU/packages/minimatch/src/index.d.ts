// @ts-nocheck
interface Options {
  nocase?: boolean;
  matchBase?: boolean;
  dot?: boolean;
}

declare class Minimatch {
  constructor(pattern: string, options?: Options);
  pattern: string;
  options: Options;
  negate: boolean;
  set: RegExp[];
  match(path: string): boolean;
}

declare function minimatch(
  path: string,
  pattern: string,
  options?: Options,
): boolean;

declare namespace minimatch {
  export { Minimatch };
  function filter(
    pattern: string,
    options?: Options,
  ): (path: string) => boolean;
  function match(list: string[], pattern: string, options?: Options): string[];
  function makeRe(pattern: string, options?: Options): RegExp;
}

export = minimatch;
