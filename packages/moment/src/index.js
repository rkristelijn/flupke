/**
 * @flupkejs/moment — Drop-in replacement for moment — uses native Date and Intl
 * @see https://www.npmjs.com/package/moment
 */
'use strict';
// Vendored from dayjs v1.11.20 (MIT) — https://github.com/iamkun/dayjs
// Wrapped as moment-compatible API. ~7KB vs moment's 300KB.
var dayjs = require('./dayjs.min.js');
var relativeTime = require('./plugin/relativeTime.js');
var customParseFormat = require('./plugin/customParseFormat.js');
var duration = require('./plugin/duration.js');
var isBetween = require('./plugin/isBetween.js');
var utc = require('./plugin/utc.js');

// Enable moment-compatible plugins
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(utc);

// moment() compatible factory — wraps dayjs
function moment(input, format) {
  if (input === undefined) return dayjs();
  if (format) return dayjs(input, format);
  return dayjs(input);
}

// Static methods matching moment API
moment.utc = function(input, format) { return dayjs.utc(input, format); };
moment.duration = function(val, unit) { return dayjs.duration(val, unit); };
moment.isMoment = function(obj) { return dayjs.isDayjs(obj); };
moment.now = function() { return Date.now(); };
moment.locale = function(l) { dayjs.locale(l); };

module.exports = moment;
module.exports.default = moment;
