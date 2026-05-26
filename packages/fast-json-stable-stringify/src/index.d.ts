declare function stringify(
  obj: any,
  opts?: { cmp?: (a: any, b: any) => number; cycles?: boolean; space?: number },
): string;
export = stringify;
