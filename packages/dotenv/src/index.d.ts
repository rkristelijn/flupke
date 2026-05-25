export function config(options?: { path?: string; encoding?: string; override?: boolean }): { parsed?: Record<string, string>; error?: Error };
export function parse(src: string | Buffer): Record<string, string>;
export function populate(target: Record<string, string>, source: Record<string, string>, options?: { override?: boolean }): void;
