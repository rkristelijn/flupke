import type {
  ChildProcess,
  SpawnOptions,
  SpawnSyncReturns,
} from "node:child_process";
declare function crossSpawn(
  cmd: string,
  args?: string[],
  opts?: SpawnOptions,
): ChildProcess;
declare namespace crossSpawn {
  function sync(
    cmd: string,
    args?: string[],
    opts?: SpawnOptions,
  ): SpawnSyncReturns<Buffer>;
}
export = crossSpawn;
