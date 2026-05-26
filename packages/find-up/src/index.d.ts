declare function findUp(
  name: string,
  options?: { cwd?: string },
): Promise<string | undefined>;
export = findUp;
