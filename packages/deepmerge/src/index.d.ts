interface Options { arrayMerge?: (target: any[], source: any[], options?: Options) => any[]; }
declare function deepmerge<T>(target: Partial<T>, source: Partial<T>, options?: Options): T;
declare namespace deepmerge { function all<T>(objects: Partial<T>[], options?: Options): T; }
export = deepmerge;
