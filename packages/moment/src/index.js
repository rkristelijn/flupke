'use strict';
// Vendored from dayjs v1.11.20 (MIT) — https://github.com/iamkun/dayjs
// Wrapped as moment-compatible API. ~7KB vs moment's 300KB.
var dayjs = require('./dayjs.min.js');
var relativeTime = require('./plugin/relativeTime.js');
var customParseFormat = require('./plugin/customParseFormat.js');
var duration = require('./plugin/duration.js');
var isBetween = require('./plugin/isBetween.js');
var utc = require('./plugin/utc.js');

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(utc);

function moment(input, format) {
  if (input === undefined) return dayjs();
  if (format) return dayjs(input, format);
  return dayjs(input);
}

moment.utc = function(input, format) { return dayjs.utc(input, format); };
moment.duration = function(val, unit) { return dayjs.duration(val, unit); };
moment.isMoment = function(obj) { return dayjs.isDayjs(obj); };
moment.now = function() { return Date.now(); };
moment.locale = function(l) { dayjs.locale(l); };

module.exports = moment;
module.exports.default = moment;
