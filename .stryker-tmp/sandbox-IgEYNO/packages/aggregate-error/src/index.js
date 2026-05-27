/**
 * @flupkejs/aggregate-error — aggregate-error
 * @see https://www.npmjs.com/package/aggregate-error
 */
// @ts-nocheck

class AggregateError extends Error {
  constructor(errors, message = "") {
    super(message);
    this.name = "AggregateError";
    this.errors = [...errors];
  }
}
module.exports = AggregateError;
