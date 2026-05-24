interface ParsedArgs { _: string[]; [key: string]: any; }
declare function yargsParser(args: string | string[]): ParsedArgs;
export = yargsParser;
