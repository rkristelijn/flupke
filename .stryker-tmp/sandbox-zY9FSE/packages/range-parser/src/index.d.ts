// @ts-nocheck
interface Range {
  start: number;
  end: number;
}

interface RangeParserOptions {
  combine?: boolean;
}

/**
 * Parse Range header into an array of ranges.
 * @param size - Total size of the resource
 * @param rangeHeader - Range header value
 * @param options - Options
 * @returns Ranges array or error code (-1 = malformed, -2 = unsatisfiable)
 */
export function rangeParser(
  size: number,
  rangeHeader: string,
  options?: RangeParserOptions,
): Range[] | number;
