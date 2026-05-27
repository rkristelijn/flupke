// @ts-nocheck
declare function pMap<T, R>(
  iterable: Iterable<T>,
  mapper: (item: T, index: number) => Promise<R>,
  opts?: { concurrency?: number },
): Promise<R[]>;
export = pMap;
