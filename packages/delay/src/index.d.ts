declare function delay(ms: number): Promise<void>;
declare namespace delay {
  function reject(ms: number, error?: Error): Promise<never>;
}
export = delay;
