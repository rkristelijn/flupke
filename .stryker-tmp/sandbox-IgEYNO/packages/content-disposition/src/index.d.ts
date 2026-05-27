// @ts-nocheck
interface ContentDispositionOptions {
  type?: string;
  fallback?: boolean;
}

interface ParsedContentDisposition {
  type: string;
  filename: string | null;
}

/**
 * Create Content-Disposition header value.
 * @param filename - Filename
 * @param options - Options
 * @returns Content-Disposition header value
 */
export function contentDisposition(
  filename: string,
  options?: ContentDispositionOptions,
): string;

/**
 * Parse Content-Disposition header value.
 * @param header - Header value to parse
 * @returns Parsed result
 */
export function parse(header: string): ParsedContentDisposition | null;
