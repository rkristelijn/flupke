'use strict';
module.exports = class EventEmitter {
  constructor() { this._listeners = Object.create(null); }
  on(event, fn) { (this._listeners[event] = this._listeners[event] || []).push(fn); return this; }
  once(event, fn) {
    var self = this;
    function wrapped() { self.off(event, wrapped); fn.apply(this, arguments); }
    wrapped.fn = fn;
    return this.on(event, wrapped);
  }
  off(event, fn) {
    if (!this._listeners[event]) return this;
    if (!fn) { delete this._listeners[event]; return this; }
    this._listeners[event] = this._listeners[event].filter(function(f) { return f !== fn && f.fn !== fn; });
    return this;
  }
  emit(event) {
    var fns = this._listeners[event];
    if (!fns || !fns.length) return false;
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < fns.length; i++) fns[i].apply(this, args);
    return true;
  }
  removeAllListeners(event) {
    if (event) delete this._listeners[event]; else this._listeners = Object.create(null);
    return this;
  }
  listeners(event) { return (this._listeners[event] || []).slice(); }
  listenerCount(event) { return (this._listeners[event] || []).length; }
};
