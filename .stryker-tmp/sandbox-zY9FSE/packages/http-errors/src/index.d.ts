// @ts-nocheck
declare function createError(status: number, message?: string, props?: object): Error & { status: number; statusCode: number; expose: boolean };
declare function createError(message: string, props?: object): Error & { status: number; statusCode: number; expose: boolean };
declare namespace createError {
  function isHttpError(err: unknown): boolean;
  class HttpError extends Error { status: number; statusCode: number; expose: boolean; }
  class BadRequest extends HttpError {}
  class Unauthorized extends HttpError {}
  class Forbidden extends HttpError {}
  class NotFound extends HttpError {}
  class InternalServerError extends HttpError {}
  // All 4xx and 5xx status codes have named constructors
  [key: string]: any;
}
export = createError;
