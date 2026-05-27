// @ts-nocheck
import type { Stats } from "node:fs";

interface EtagOptions {
  weak?: boolean;
}

/**
 * Generate HTTP ETag from entity.
 * @param entity - String, Buffer, or Stats object
 * @param options - Options object
 * @returns The ETag string
 */
export function etag(
  entity: string | Buffer | Stats,
  options?: EtagOptions,
): string;
