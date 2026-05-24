declare function mem<T extends Function>(fn: T, opts?: { cacheKey?: (...args: any[]) => any }): T;
export = mem;
