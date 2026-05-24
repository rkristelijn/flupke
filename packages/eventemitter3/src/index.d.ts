declare class EventEmitter {
  on(event: string, fn: (...args: any[]) => void): this;
  once(event: string, fn: (...args: any[]) => void): this;
  off(event: string, fn?: (...args: any[]) => void): this;
  emit(event: string, ...args: any[]): boolean;
  removeAllListeners(event?: string): this;
  listeners(event: string): ((...args: any[]) => void)[];
  listenerCount(event: string): number;
}
export = EventEmitter;
