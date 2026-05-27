/**
 * Parse byte string to number.
 * @param val - Byte string (e.g., '1KB', '2 mb')
 * @returns Number of bytes
 */
// @ts-nocheck

export function parse(val: string): number;

/**
 * Format number to byte string.
 * @param val - Number of bytes
 * @returns Formatted string (e.g., '1KB')
 */
export function format(val: number): string;
