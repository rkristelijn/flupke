declare function escalade(dir: string, cb: (dir: string, files: string[]) => string | false | void | Promise<string | false | void>): Promise<string | undefined>;
export = escalade;
