// @ts-nocheck
declare function escalade(
  dir: string,
  cb: (
    dir: string,
    files: string[],
  ) => string | false | undefined | Promise<string | false | undefined>,
): Promise<string | undefined>;
export = escalade;
