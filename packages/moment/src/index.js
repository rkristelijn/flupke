'use strict';

var UNITS = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000, w: 604800000 };

function moment(input) {
  if (input instanceof Moment) return input.clone();
  return new Moment(input);
}

function Moment(input) {
  if (input instanceof Date) this._d = new Date(input.getTime());
  else if (typeof input === 'string') this._d = new Date(input);
  else if (typeof input === 'number') this._d = new Date(input);
  else this._d = new Date();
  if (isNaN(this._d.getTime())) this._isValid = false;
  else this._isValid = true;
}

var p = Moment.prototype;

p.isValid = function() { return this._isValid; };
p.clone = function() { return new Moment(this._d); };
p.toDate = function() { return new Date(this._d.getTime()); };
p.valueOf = function() { return this._d.getTime(); };
p.unix = function() { return Math.floor(this._d.getTime() / 1000); };
p.toISOString = function() { return this._d.toISOString(); };
p.toJSON = function() { return this._d.toISOString(); };
p.toString = function() { return this._d.toString(); };

p.year = function(v) { if (v !== undefined) { this._d.setFullYear(v); return this; } return this._d.getFullYear(); };
p.month = function(v) { if (v !== undefined) { this._d.setMonth(v); return this; } return this._d.getMonth(); };
p.date = function(v) { if (v !== undefined) { this._d.setDate(v); return this; } return this._d.getDate(); };
p.day = function() { return this._d.getDay(); };
p.hour = function(v) { if (v !== undefined) { this._d.setHours(v); return this; } return this._d.getHours(); };
p.minute = function(v) { if (v !== undefined) { this._d.setMinutes(v); return this; } return this._d.getMinutes(); };
p.second = function(v) { if (v !== undefined) { this._d.setSeconds(v); return this; } return this._d.getSeconds(); };
p.millisecond = function(v) { if (v !== undefined) { this._d.setMilliseconds(v); return this; } return this._d.getMilliseconds(); };

p.add = function(amount, unit) {
  var ms = (typeof amount === 'object') ? durationToMs(amount) : amount * (UNITS[unit] || UNITS[unit && unit[0]] || 1);
  this._d = new Date(this._d.getTime() + ms);
  return this;
};

p.subtract = function(amount, unit) { return this.add(-amount, unit); };

p.startOf = function(unit) {
  var d = this._d;
  if (unit === 'day' || unit === 'd') { d.setHours(0, 0, 0, 0); }
  else if (unit === 'month' || unit === 'M') { d.setDate(1); d.setHours(0, 0, 0, 0); }
  else if (unit === 'year' || unit === 'y') { d.setMonth(0, 1); d.setHours(0, 0, 0, 0); }
  return this;
};

p.endOf = function(unit) {
  return this.startOf(unit).add(1, unit).subtract(1, 'ms');
};

p.diff = function(other, unit) {
  var ms = this._d.getTime() - moment(other)._d.getTime();
  if (!unit || unit === 'ms') return ms;
  if (unit === 's' || unit === 'seconds') return Math.floor(ms / 1000);
  if (unit === 'm' || unit === 'minutes') return Math.floor(ms / 60000);
  if (unit === 'h' || unit === 'hours') return Math.floor(ms / 3600000);
  if (unit === 'd' || unit === 'days') return Math.floor(ms / 86400000);
  if (unit === 'M' || unit === 'months') return (this.year() - moment(other).year()) * 12 + this.month() - moment(other).month();
  if (unit === 'y' || unit === 'years') return this.year() - moment(other).year();
  return ms;
};

p.isBefore = function(other) { return this._d < moment(other)._d; };
p.isAfter = function(other) { return this._d > moment(other)._d; };
p.isSame = function(other, unit) {
  if (!unit) return this._d.getTime() === moment(other)._d.getTime();
  return this.startOf(unit).valueOf() === moment(other).startOf(unit).valueOf();
};
p.isBetween = function(a, b) { return this.isAfter(a) && this.isBefore(b); };

p.format = function(fmt) {
  if (!fmt) return this.toISOString();
  var d = this._d;
  var tokens = {
    YYYY: d.getFullYear(),
    YY: String(d.getFullYear()).slice(-2),
    MM: pad(d.getMonth() + 1),
    M: d.getMonth() + 1,
    DD: pad(d.getDate()),
    D: d.getDate(),
    HH: pad(d.getHours()),
    H: d.getHours(),
    mm: pad(d.getMinutes()),
    ss: pad(d.getSeconds()),
    SSS: String(d.getMilliseconds()).padStart(3, '0'),
    A: d.getHours() < 12 ? 'AM' : 'PM',
    a: d.getHours() < 12 ? 'am' : 'pm'
  };
  return fmt.replace(/YYYY|YY|MM|M|DD|D|HH|H|mm|ss|SSS|A|a/g, function(m) { return tokens[m]; });
};

p.fromNow = function() {
  var diff = Date.now() - this._d.getTime();
  var abs = Math.abs(diff);
  var suffix = diff > 0 ? ' ago' : ' from now';
  if (abs < 60000) return 'a few seconds' + suffix;
  if (abs < 3600000) return Math.floor(abs / 60000) + ' minutes' + suffix;
  if (abs < 86400000) return Math.floor(abs / 3600000) + ' hours' + suffix;
  if (abs < 2592000000) return Math.floor(abs / 86400000) + ' days' + suffix;
  if (abs < 31536000000) return Math.floor(abs / 2592000000) + ' months' + suffix;
  return Math.floor(abs / 31536000000) + ' years' + suffix;
};

function pad(n) { return n < 10 ? '0' + n : '' + n; }
function durationToMs(obj) {
  return (obj.years || 0) * 31536000000 + (obj.months || 0) * 2592000000 +
    (obj.days || 0) * 86400000 + (obj.hours || 0) * 3600000 +
    (obj.minutes || 0) * 60000 + (obj.seconds || 0) * 1000 + (obj.milliseconds || 0);
}

moment.utc = function(input) { var m = moment(input); m._utc = true; return m; };
moment.duration = function(val, unit) { return { asMilliseconds: function() { return val * (UNITS[unit] || 1); } }; };
moment.isMoment = function(obj) { return obj instanceof Moment; };
moment.now = function() { return Date.now(); };

module.exports = moment;
module.exports.default = moment;
