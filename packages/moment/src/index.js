// Vendored from dayjs v1.11.20 (MIT) — https://github.com/iamkun/dayjs
// Wrapped as moment-compatible API. ~7KB vs moment's 300KB.
const dayjs = require("./dayjs.min.js");
const relativeTime = require("./plugin/relativeTime.js");
const customParseFormat = require("./plugin/customParseFormat.js");
const duration = require("./plugin/duration.js");
const isBetween = require("./plugin/isBetween.js");
const utc = require("./plugin/utc.js");

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
moment.utc = (input, format) => dayjs.utc(input, format);
moment.duration = (val, unit) => dayjs.duration(val, unit);
moment.isMoment = (obj) => dayjs.isDayjs(obj);
moment.now = () => Date.now();
moment.locale = (l) => {
  dayjs.locale(l);
};

module.exports = moment;
module.exports.default = moment;
