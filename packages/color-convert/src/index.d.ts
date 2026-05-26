export const rgb: {
  hsl: (r: number, g: number, b: number) => [number, number, number];
  hex: (r: number, g: number, b: number) => string;
};
export const hsl: {
  rgb: (h: number, s: number, l: number) => [number, number, number];
};
export const hex: {
  rgb: (hex: string) => [number, number, number] | null;
};
