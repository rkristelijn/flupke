declare function which(cmd: string): string;
declare namespace which {
  function sync(cmd: string): string;
}
export = which;
