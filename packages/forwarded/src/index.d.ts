import { IncomingMessage } from 'node:http';
declare function forwarded(req: IncomingMessage): string[];
export = forwarded;
