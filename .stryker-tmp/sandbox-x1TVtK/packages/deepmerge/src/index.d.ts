// @ts-nocheck
interface Options {
  arrayMerge?: (target: any[], source: any[], options?: Options) => any[];
}
declare function deepmerge<T extends object = object>(
  target: T,
  source: Partial<T> & Record<string, any>,
  options?: Options,
): T & Record<string, any>;
declare function deepmerge(target: any, source: any, options?: Options): any;
declare namespace deepmerge {
  function all(objects: object[], options?: Options): any;
}
export = deepmerge;
