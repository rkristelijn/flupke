class LRUCache {
  constructor(options) {
    if (typeof options === "number") options = { max: options };
    this.max = options?.max || 1000;
    this.maxAge = options?.maxAge || options?.ttl || 0;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return undefined;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }
  set(key, val) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.max)
      this.cache.delete(this.cache.keys().next().value);
    this.cache.set(key, val);
    return this;
  }
  has(key) {
    return this.cache.has(key);
  }
  delete(key) {
    return this.cache.delete(key);
  }
  clear() {
    this.cache.clear();
  }
  get length() {
    return this.cache.size;
  }
  get size() {
    return this.cache.size;
  }
  *keys() {
    yield* this.cache.keys();
  }
  *values() {
    yield* this.cache.values();
  }
}
// Support both: require('lru-cache') and { LRUCache } = require('lru-cache')
module.exports = LRUCache;
module.exports.LRUCache = LRUCache;
