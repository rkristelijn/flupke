class AbortError extends Error {
  constructor(message) {
    super(message instanceof Error ? message.message : message);
    this.name = "AbortError";
    this.originalError = message instanceof Error ? message : undefined;
  }
}

async function pRetry(fn, options = {}) {
  const { retries = 10, onFailedAttempt, signal } = options;
  let attempt = 0;
  while (true) {
    try {
      return await fn(attempt);
    } catch (err) {
      if (err instanceof AbortError) throw err.originalError || err;
      if (signal?.aborted) throw err;
      attempt++;
      if (attempt > retries) throw err;
      err.attemptNumber = attempt;
      err.retriesLeft = retries - attempt;
      if (onFailedAttempt) await onFailedAttempt(err);
      if (signal?.aborted) throw err;
    }
  }
}

module.exports = pRetry;
module.exports.AbortError = AbortError;
module.exports.default = pRetry;
