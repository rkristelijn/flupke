declare function concatMap<T, U>(
  xs: T[],
  fn: (x: T, i: number) => U | U[],
): U[];
export = concatMap;
