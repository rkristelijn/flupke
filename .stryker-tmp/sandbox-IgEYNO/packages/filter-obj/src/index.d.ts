// @ts-nocheck
declare function filterObj<V>(
  obj: Record<string, V>,
  fn: (key: string, value: V, obj: Record<string, V>) => boolean,
): Record<string, V>;
export = filterObj;
