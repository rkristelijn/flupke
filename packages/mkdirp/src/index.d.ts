declare function mkdirp(path: string): Promise<string>;
declare namespace mkdirp {
  function sync(path: string): string;
}
export = mkdirp;
