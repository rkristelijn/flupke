interface ContentTypeObject {
  type: string;
  parameters: { [key: string]: string };
}

interface Request {
  headers?: { [key: string]: string };
}

/**
 * Parse Content-Type header.
 * @param stringOrReq - Content-Type string or request object
 * @returns Parsed content type object
 */
export function parse(stringOrReq: string | Request): ContentTypeObject;

/**
 * Format content type object to string.
 * @param obj - Content type object
 * @returns Formatted content type string
 */
export function format(obj: ContentTypeObject): string;