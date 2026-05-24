declare function parse(v: string): { major: number; minor: number; patch: number; prerelease: string; version: string } | null;
declare function compare(a: string, b: string): number;
declare function gt(a: string, b: string): boolean;
declare function lt(a: string, b: string): boolean;
declare function eq(a: string, b: string): boolean;
declare function satisfies(v: string, r: string): boolean;
export = { parse, compare, gt, lt, eq, satisfies };