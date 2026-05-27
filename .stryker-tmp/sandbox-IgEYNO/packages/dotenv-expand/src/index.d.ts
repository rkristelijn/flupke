// @ts-nocheck
interface DotenvConfig {
  parsed?: Record<string, string>;
}
declare function expand(config: DotenvConfig): DotenvConfig;
export = expand;
