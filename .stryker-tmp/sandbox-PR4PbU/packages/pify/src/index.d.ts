// @ts-nocheck
declare function pify<T extends Function>(
  fn: T,
): (...args: any[]) => Promise<any>;
export = pify;
