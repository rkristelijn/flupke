interface Options {
  retries?: number;
  onFailedAttempt?: (
    error: Error & { attemptNumber: number; retriesLeft: number },
  ) => void | Promise<void>;
  signal?: AbortSignal;
}

declare class AbortError extends Error {
  readonly originalError?: Error;
  constructor(message: string | Error);
}

declare function pRetry<T>(
  fn: (attempt: number) => T | Promise<T>,
  options?: Options,
): Promise<T>;

declare namespace pRetry {
  export { AbortError };
}

export = pRetry;
