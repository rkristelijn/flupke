// @ts-nocheck
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;
export type JsonObject = { [Key in string]: JsonValue };
export type JsonArray = JsonValue[];
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null;
export type Class<T = unknown> = new (...args: any[]) => T;
export type Promisable<T> = T | PromiseLike<T>;
export type Awaitable<T> = T | PromiseLike<T>;
export type Simplify<T> = { [K in keyof T]: T[K] } & {};
export type SetRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
export type SetOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
