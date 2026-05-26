import type { ChildProcess } from "node:child_process";

declare function crossEnv(args: string[]): ChildProcess | null;

declare namespace crossEnv {
  function parseArgs(args: string[]): {
    env: Record<string, string>;
    command: string;
    args: string[];
  };
}

export = crossEnv;
