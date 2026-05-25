export class IPv4 {
  octets: number[];
  constructor(octets: number[]);
  kind(): 'ipv4';
  toString(): string;
  toByteArray(): number[];
  match(other: IPv4 | [IPv4, number], bits?: number): boolean;
  range(): string;
  prefixLengthFromSubnetMask(): number | null;
}

export class IPv6 {
  parts: number[];
  constructor(parts: number[]);
  kind(): 'ipv6';
  toString(): string;
  toByteArray(): number[];
  match(other: IPv6 | [IPv6, number], bits?: number): boolean;
  range(): string;
  isIPv4MappedAddress(): boolean;
  toIPv4Address(): IPv4;
}

export function isValid(str: string): boolean;
export function parse(str: string): IPv4 | IPv6;
export function parseCIDR(str: string): [IPv4 | IPv6, number];
export function process(str: string): IPv4 | IPv6;
export function fromByteArray(bytes: number[]): IPv4 | IPv6;
export function subnetMatch(addr: IPv4 | IPv6, rangeList: Record<string, [IPv4 | IPv6, number] | Array<[IPv4 | IPv6, number]>>, defaultName?: string): string;
