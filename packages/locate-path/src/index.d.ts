declare function locatePath(
  paths: string[],
  options?: { cwd?: string },
): Promise<string | undefined>;
export = locatePath;
