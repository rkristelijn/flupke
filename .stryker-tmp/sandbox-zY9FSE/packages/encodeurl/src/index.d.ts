/**
 * Encode URL characters that are not allowed in URLs.
 * Does NOT encode already-encoded sequences (%XX).
 * @param str - The string to encode
 * @returns The encoded string
 */
// @ts-nocheck

export function encodeurl(str: string): string;
