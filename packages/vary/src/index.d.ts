interface Response {
  getHeader(name: string): string | undefined;
  setHeader(name: string, value: string): void;
}

/**
 * Append field to Vary header.
 * @param res - HTTP response object
 * @param field - Field name to add
 */
export function vary(res: Response, field: string): void;

/**
 * Append field to existing Vary header string.
 * @param header - Existing Vary header
 * @param field - Field name to add
 * @returns Updated Vary header
 */
export function append(header: string, field: string): string;
