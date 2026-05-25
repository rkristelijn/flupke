const channel = new WeakMap();
module.exports = {
  getChannel(obj) {
    if (!channel.has(obj))
      channel.set(obj, { get: null, has: null, shape: [] });
    return channel.get(obj);
  },
  setChannel(obj, ch) {
    channel.set(obj, ch);
  },
};
