interface RetryOpts { retries?: number; delay?: number; }
declare function retry<T>(fn: (attempt: number) => Promise<T>, opts?: RetryOpts): Promise<T>;
export = retry;
