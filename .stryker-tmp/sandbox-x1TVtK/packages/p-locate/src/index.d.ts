// @ts-nocheck
declare function pLocate<T>(
  iterable: Iterable<T>,
  tester: (item: T) => Promise<boolean>,
): Promise<T | undefined>;
export = pLocate;
