// Public API
module.exports = class EventEmitter {
  constructor() {
    this._listeners = Object.create(null);
  }
  /** Register an event listener */
  on(event, fn) {
    (this._listeners[event] = this._listeners[event] || []).push(fn);
    return this;
  }
  once(event, fn) {
    const self = this;
    function wrapped() {
      self.off(event, wrapped);
      fn.apply(this, arguments);
    }
    wrapped.fn = fn;
    return this.on(event, wrapped);
  }
  off(event, fn) {
    if (!this._listeners[event]) return this;
    if (!fn) {
      delete this._listeners[event];
      return this;
    }
    this._listeners[event] = this._listeners[event].filter(
      (f) => f !== fn && f.fn !== fn,
    );
    return this;
  }
  /** Emit an event to all registered listeners */
  emit(event) {
    const fns = this._listeners[event];
    if (!fns || !fns.length) return false;
    const args = Array.prototype.slice.call(arguments, 1);
    for (let i = 0; i < fns.length; i++) fns[i].apply(this, args);
    return true;
  }
  removeAllListeners(event) {
    if (event) delete this._listeners[event];
    else this._listeners = Object.create(null);
    return this;
  }
  listeners(event) {
    return (this._listeners[event] || []).slice();
  }
  listenerCount(event) {
    return (this._listeners[event] || []).length;
  }
};
