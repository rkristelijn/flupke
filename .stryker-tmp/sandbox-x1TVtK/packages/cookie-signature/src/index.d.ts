/**
 * Sign value with HMAC-SHA256.
 * @param val - Value to sign
 * @param secret - Secret key
 * @returns Signature
 */
// @ts-nocheck

export function sign(val: string, secret: string): string;

/**
 * Verify and extract original value.
 * @param val - Signed value
 * @param secret - Secret key
 * @returns Original value or false
 */
export function unsign(val: string, secret: string): string | false;
