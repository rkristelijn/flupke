// @ts-nocheck
declare function resolveFrom(fromDir: string, moduleId: string): string;
declare namespace resolveFrom {
  function silent(fromDir: string, moduleId: string): string | undefined;
}
export = resolveFrom;
