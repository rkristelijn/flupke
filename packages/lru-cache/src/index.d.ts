declare class LRUCache {
  constructor(options?: { max?: number });
  get(key: unknown): unknown;
  set(key: unknown, val: unknown): this;
  has(key: unknown): boolean;
  delete(key: unknown): boolean;
  clear(): void;
}
export = LRUCache;