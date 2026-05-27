// @ts-nocheck
interface ExecaResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}
declare function execa(
  cmd: string,
  args?: string[],
  opts?: object,
): Promise<ExecaResult>;
declare namespace execa {
  function sync(cmd: string, args?: string[], opts?: object): ExecaResult;
}
export = execa;
