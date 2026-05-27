// @ts-nocheck
interface OnetimeFn<T extends Function> {
  (...args: any[]): any;
  called(): boolean;
}
declare function onetime<T extends Function>(fn: T): OnetimeFn<T>;
export = onetime;
