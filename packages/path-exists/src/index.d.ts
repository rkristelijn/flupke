declare function pathExists(path: string): Promise<boolean>;
declare namespace pathExists { function sync(path: string): boolean; }
export = pathExists;
