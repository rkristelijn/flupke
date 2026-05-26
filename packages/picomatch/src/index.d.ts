interface PicomatchOptions {
  nocase?: boolean;
}
interface Matcher {
  (str: string): boolean;
  regex: RegExp;
}
declare function picomatch(glob: string, opts?: PicomatchOptions): Matcher;
declare namespace picomatch {
  function isMatch(str: string, glob: string, opts?: PicomatchOptions): boolean;
  function makeRe(glob: string, opts?: PicomatchOptions): RegExp;
  function test(str: string, regex: RegExp): boolean;
}
export = picomatch;
