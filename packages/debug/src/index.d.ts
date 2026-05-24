interface Debugger { (...args: any[]): void; namespace: string; enabled: boolean; }
interface Debug { (namespace: string): Debugger; enabled(namespace: string): boolean; }
declare const debug: Debug;
export = debug;
