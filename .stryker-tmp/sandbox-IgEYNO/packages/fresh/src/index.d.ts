// @ts-nocheck
interface Headers {
  [key: string]: string | undefined;
}

/**
 * Check if a response is fresh based on request headers.
 * @param reqHeaders - Request headers object
 * @param resHeaders - Response headers object
 * @returns True if response is fresh
 */
export function fresh(reqHeaders: Headers, resHeaders: Headers): boolean;
