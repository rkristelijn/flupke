declare function mapObj<V, R>(
  obj: Record<string, V>,
  fn: (key: string, value: V, obj: Record<string, V>) => [string, R],
): Record<string, R>;
export = mapObj;
