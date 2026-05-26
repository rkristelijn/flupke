interface Options {
  transform?: (value: string) => string;
  pad?: boolean;
}

declare function fillRange(
  start: string | number,
  end: string | number,
  step?: number | Options,
  options?: Options,
): string[];
export = fillRange;
