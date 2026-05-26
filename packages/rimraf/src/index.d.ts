declare function rimraf(path: string): Promise<void>;
declare namespace rimraf {
  function sync(path: string): void;
}
export = rimraf;
