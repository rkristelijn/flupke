function first(stuff, done) {
  var thunks = [];
  for (var i = 0; i < stuff.length; i++) {
    var arr = stuff[i];
    var ee = arr[0];
    var events = arr.slice(1);
    for (var j = 0; j < events.length; j++) {
      var event = events[j];
      var fn = listener(event, done);
      ee.on(event, fn);
      thunks.push({ ee: ee, event: event, fn: fn });
    }
  }
  function cleanup() { for (var i = 0; i < thunks.length; i++) thunks[i].ee.removeListener(thunks[i].event, thunks[i].fn); }
  done.cancel = cleanup;
  return cleanup;
}
function listener(event, done) { return function(arg) { done.cancel(); done(null, this, event, arg); }; }
module.exports = first;
