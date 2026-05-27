// @ts-nocheck
declare function getChannel(obj: object): {
  get: unknown;
  has: unknown;
  shape: unknown[];
};
declare function setChannel(
  obj: object,
  ch: { get: unknown; has: unknown; shape: unknown[] },
): void;
export = { getChannel, setChannel };
