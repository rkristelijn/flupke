interface Deprecate {
  (message: string): void;
  function<T extends Function>(fn: T, message?: string): T;
  property(obj: object, prop: string, message?: string): void;
}
declare function depd(namespace: string): Deprecate;
export = depd;
