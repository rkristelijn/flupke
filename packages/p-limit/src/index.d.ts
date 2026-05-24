interface Limit { <T>(fn: () => Promise<T>): Promise<T>; activeCount(): number; pendingCount(): number; }
declare function pLimit(concurrency: number): Limit;
export = pLimit;
