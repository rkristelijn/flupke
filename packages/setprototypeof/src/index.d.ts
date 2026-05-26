/**
 * Cross-platform Object.setPrototypeOf.
 * @param obj - Object to set prototype of
 * @param proto - Prototype to set
 * @returns Object with new prototype
 */
export default function setprototypeof<T, U>(obj: T, proto: U): T & U;
