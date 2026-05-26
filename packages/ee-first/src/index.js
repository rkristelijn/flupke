function first(stuff, done) {
  const thunks = [];
  for (const arr of stuff) {
    const ee = arr[0];
    const events = arr.slice(1);
    for (const event of events) {
      const fn = listener(event, done);
      ee.on(event, fn);
      thunks.push({ ee: ee, event: event, fn: fn });
    }
  }
  function cleanup() {
    for (const thunk of thunks)
      thunk.ee.removeListener(thunk.event, thunk.fn);
  }
  done.cancel = cleanup;
  return cleanup;
}
function listener(event, done) {
  return function (arg) {
    done.cancel();
    done(null, this, event, arg);
  };
}
module.exports = first;
