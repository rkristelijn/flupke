// @ts-nocheck
interface UI {
  div(...cols: (string | { text: string; width?: number })[]): void;
  span(...cols: any[]): void;
  toString(): string;
}
declare function cliui(opts?: { width?: number }): UI;
export = cliui;
