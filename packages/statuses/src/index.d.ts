export const codes: number[];
export const message: { [code: number]: string };
export const code: { [message: string]: number };
export const redirect: { [code: number]: true };
export const empty: { [code: number]: true };
export const retry: { [code: number]: true };

/**
 * Get status message for code, or get code for status message.
 * @param code - Status code or message
 * @returns The corresponding message or code
 */
export function statuses(code: number): string | null;
export function statuses(code: string): number | null;