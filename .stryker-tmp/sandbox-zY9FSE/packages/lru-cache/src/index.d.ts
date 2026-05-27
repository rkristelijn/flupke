// @ts-nocheck
declare class LRUCache<K = unknown, V = unknown> {
  constructor(options?: { max?: number });
  get(key: K): V | undefined;
  set(key: K, val: V): this;
  has(key: K): boolean;
  delete(key: K): boolean;
  clear(): void;
  readonly size: number;
}
export = LRUCache;
