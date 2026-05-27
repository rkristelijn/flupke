// @ts-nocheck
interface ParsedUrl {
  href: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string | null;
  pathname: string;
  search: string;
  query: string | null;
  path: string;
}

interface Request {
  url?: string;
  originalUrl?: string;
  _parsedUrl?: ParsedUrl;
  _parsedOriginalUrl?: ParsedUrl;
}

/**
 * Parse URL from request object with caching.
 * @param req - HTTP request object
 * @returns Parsed URL object
 */
export function parseurl(req: Request): ParsedUrl | undefined;

/**
 * Parse original URL from request object with caching.
 * @param req - HTTP request object
 * @returns Parsed URL object
 */
export function parseurl.original(req: Request): ParsedUrl | undefined;