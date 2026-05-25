export { Buffer } from 'node:buffer';
export declare const Buffer: Omit<typeof globalThis.Buffer, 'allocUnsafe' | 'allocUnsafeSlow'> & {
  from(data: string | ArrayBuffer | SharedArrayBuffer | readonly number[] | Uint8Array, encoding?: BufferEncoding): Buffer;
  alloc(size: number, fill?: string | number | Uint8Array, encoding?: BufferEncoding): Buffer;
};
