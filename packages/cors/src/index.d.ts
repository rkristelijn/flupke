import type { IncomingMessage, ServerResponse } from "node:http";

interface CorsOptions {
  origin?:
    | string
    | boolean
    | RegExp
    | (string | RegExp)[]
    | ((
        origin: string,
        callback: (err: Error | null, allow?: boolean) => void,
      ) => void);
  methods?: string | string[];
  allowedHeaders?: string | string[];
  exposedHeaders?: string | string[];
  credentials?: boolean;
  maxAge?: number;
  preflightContinue?: boolean;
  optionsSuccessStatus?: number;
}

type CorsOptionsDelegate = (
  req: IncomingMessage,
  callback: (err: Error | null, options?: CorsOptions) => void,
) => void;

declare function cors(
  options?: CorsOptions | CorsOptionsDelegate,
): (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: Error) => void,
) => void;
export = cors;
