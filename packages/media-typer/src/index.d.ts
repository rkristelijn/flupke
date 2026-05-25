interface MediaType {
  type: string;
  subtype: string;
  suffix?: string;
}

export function parse(str: string): MediaType;
export function format(obj: MediaType): string;
export function test(str: string): boolean;
