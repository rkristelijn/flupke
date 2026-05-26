export const LEVEL: unique symbol;
export const MESSAGE: unique symbol;
export const SPLAT: unique symbol;

interface LevelConfig {
  levels: Record<string, number>;
  colors: Record<string, string>;
}

export const configs: {
  npm: LevelConfig;
  syslog: LevelConfig;
  cli: LevelConfig;
};
