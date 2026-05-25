/**
 * @flupkejs/p-queue — p-queue
 * @see https://www.npmjs.com/package/p-queue
 */
class PQueue {
  constructor(opts = {}) { this.concurrency = opts.concurrency || 1; this.active = 0; this.queue = []; }
  add(fn) { return new Promise((resolve, reject) => { this.queue.push({ fn, resolve, reject }); this._next(); }); }
  _next() { if (this.active >= this.concurrency || !this.queue.length) return; this.active++; const { fn, resolve, reject } = this.queue.shift(); fn().then(v => { this.active--; resolve(v); this._next(); }, e => { this.active--; reject(e); this._next(); }); }
  get size() { return this.queue.length; }
  get pending() { return this.active; }
}
module.exports = PQueue;
