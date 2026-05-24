declare class AggregateError extends Error { errors: Error[]; constructor(errors: Iterable<Error>, message?: string); }
export = AggregateError;
