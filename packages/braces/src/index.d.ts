interface Options {
  expand?: boolean;
}

declare function braces(pattern: string, options?: Options): string[];

declare namespace braces {
  function expand(pattern: string): string[];
}

export = braces;
