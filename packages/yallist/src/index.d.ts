declare class Yallist<T> {
  head: any;
  tail: any;
  length: number;
  constructor(arr?: T[]);
  push(v: T): number;
  pop(): T | undefined;
  shift(): T | undefined;
  unshift(v: T): number;
  forEach(fn: (v: T, i: number) => void): void;
  toArray(): T[];
}
export = Yallist;
