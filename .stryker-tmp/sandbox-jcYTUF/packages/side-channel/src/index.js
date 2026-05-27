/**
 * Create a side channel — WeakMap-based private storage.
 * @returns {{ get: function, set: function, has: function }}
 */
// @ts-nocheck

function SideChannel() {
  const wm = new WeakMap();
  return {
    get(key) {
      return wm.get(key);
    },
    set(key, value) {
      wm.set(key, value);
    },
    has(key) {
      return wm.has(key);
    },
  };
}

module.exports = SideChannel;
