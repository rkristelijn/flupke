// @ts-nocheck
declare class PQueue {
  constructor(opts?: { concurrency?: number });
  add<T>(fn: () => Promise<T>): Promise<T>;
  get size(): number;
  get pending(): number;
}
export = PQueue;
