// @ts-nocheck
interface Options {
  cwd?: string;
  dot?: boolean;
  nodir?: boolean;
  ignore?: string | string[];
}

declare function glob(pattern: string, options?: Options): Promise<string[]>;
declare function glob(
  pattern: string,
  cb: (err: Error | null, matches: string[]) => void,
): void;
declare function glob(
  pattern: string,
  options: Options,
  cb: (err: Error | null, matches: string[]) => void,
): void;

declare namespace glob {
  function sync(pattern: string, options?: Options): string[];
  function glob(pattern: string, options?: Options): Promise<string[]>;
}

export = glob;
