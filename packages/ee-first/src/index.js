function first(stuff, done) {
  let thunks = [];
  for (let i = 0; i < stuff.length; i++) {
    let arr = stuff[i];
    let ee = arr[0];
    let events = arr.slice(1);
    for (let j = 0; j < events.length; j++) {
      let event = events[j];
      let fn = listener(event, done);
      ee.on(event, fn);
      thunks.push({ ee: ee, event: event, fn: fn });
    }
  }
  function cleanup() { for (let i = 0; i < thunks.length; i++) thunks[i].ee.removeListener(thunks[i].event, thunks[i].fn); }
  done.cancel = cleanup;
  return cleanup;
}
function listener(event, done) { return function(arg) { done.cancel(); done(null, this, event, arg); }; }
module.exports = first;
