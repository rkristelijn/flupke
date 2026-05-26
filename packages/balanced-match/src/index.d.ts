declare function balanced(
  a: string,
  b: string,
  str: string,
): { start: number; end: number; pre: string; body: string; post: string } | -1;
export = balanced;
