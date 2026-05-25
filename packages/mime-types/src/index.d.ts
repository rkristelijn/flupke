export const types: { [ext: string]: string };
export const extensions: { [mime: string]: string };

/**
 * Get MIME type for file extension.
 * @param path - File path or extension
 * @returns MIME type or false
 */
export function lookup(path: string): string | false;

/**
 * Get full content-type with charset.
 * @param type - MIME type
 * @returns Full content-type
 */
export function contentType(type: string): string | false;

/**
 * Get extension for MIME type.
 * @param type - MIME type
 * @returns Extension or false
 */
export function extension(type: string): string | false;