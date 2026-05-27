// @ts-nocheck
interface Response {
  finished?: boolean;
  writableFinished?: boolean;
  _onFinished?: Array<(err: null, msg: Response) => void>;
}

/**
 * Execute callback when HTTP response finishes.
 * @param msg - HTTP response object
 * @param listener - Callback function
 * @returns Abort function
 */
export function onFinished(
  msg: Response,
  listener: (err: null, msg: Response) => void,
): () => void;

/**
 * Check if HTTP response has finished.
 * @param msg - HTTP response object
 * @returns True if finished
 */
export function isFinished(msg: Response): boolean;
