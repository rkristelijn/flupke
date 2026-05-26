declare function onExit(
  handler: (code: number | null, signal: string | null) => void,
): () => void;
export = onExit;
