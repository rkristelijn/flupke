/**
 * @flupkejs/ms — Drop-in replacement for ms — time string parsing/formatting
 * @see https://www.npmjs.com/package/ms
 */
// @ts-nocheck

// Time unit constants in milliseconds
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const S = 1000;
const M = stryMutAct_9fa48("0") ? S / 60 : (stryCov_9fa48("0"), S * 60);
const H = stryMutAct_9fa48("1") ? M / 60 : (stryCov_9fa48("1"), M * 60);
const D = stryMutAct_9fa48("2") ? H / 24 : (stryCov_9fa48("2"), H * 24);
const W = stryMutAct_9fa48("3") ? D / 7 : (stryCov_9fa48("3"), D * 7);
const Y = stryMutAct_9fa48("4") ? D / 365.25 : (stryCov_9fa48("4"), D * 365.25);

// Regex matching time strings like "2 days", "1h", "500ms"
// Safe: input length capped at 100 chars to prevent ReDoS
const PARSE_RE = stryMutAct_9fa48("24") ? /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years)?$/i : stryMutAct_9fa48("23") ? /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks|y|years?)?$/i : stryMutAct_9fa48("22") ? /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("21") ? /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("20") ? /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("19") ? /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("18") ? /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("17") ? /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("16") ? /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)$/i : stryMutAct_9fa48("15") ? /^(-?(?:\d+)?\.?\d+)\S*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("14") ? /^(-?(?:\d+)?\.?\d+)\s(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("13") ? /^(-?(?:\d+)?\.?\D+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("12") ? /^(-?(?:\d+)?\.?\d)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("11") ? /^(-?(?:\d+)?\.\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("10") ? /^(-?(?:\D+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("9") ? /^(-?(?:\d)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("8") ? /^(-?(?:\d+)\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("7") ? /^(-(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : stryMutAct_9fa48("6") ? /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?/i : stryMutAct_9fa48("5") ? /(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i : (stryCov_9fa48("5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"), /^(-?(?:\d+)?\.?\d+)\s*(ms|milliseconds?|s|sec|seconds?|m|min|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)?$/i);

/** @param {string|number} val @param {{ long?: boolean }} [options] @returns {string|number|undefined} */
// Public API
module.exports = function ms(val, options) {
  if (stryMutAct_9fa48("25")) {
    {}
  } else {
    stryCov_9fa48("25");
    const type = typeof val;
    if (stryMutAct_9fa48("28") ? type === "string" || val.length > 0 : stryMutAct_9fa48("27") ? false : stryMutAct_9fa48("26") ? true : (stryCov_9fa48("26", "27", "28"), (stryMutAct_9fa48("30") ? type !== "string" : stryMutAct_9fa48("29") ? true : (stryCov_9fa48("29", "30"), type === (stryMutAct_9fa48("31") ? "" : (stryCov_9fa48("31"), "string")))) && (stryMutAct_9fa48("34") ? val.length <= 0 : stryMutAct_9fa48("33") ? val.length >= 0 : stryMutAct_9fa48("32") ? true : (stryCov_9fa48("32", "33", "34"), val.length > 0)))) return parse(val);
    if (stryMutAct_9fa48("37") ? type === "number" || Number.isFinite(val) : stryMutAct_9fa48("36") ? false : stryMutAct_9fa48("35") ? true : (stryCov_9fa48("35", "36", "37"), (stryMutAct_9fa48("39") ? type !== "number" : stryMutAct_9fa48("38") ? true : (stryCov_9fa48("38", "39"), type === (stryMutAct_9fa48("40") ? "" : (stryCov_9fa48("40"), "number")))) && Number.isFinite(val))) return (stryMutAct_9fa48("41") ? options.long : (stryCov_9fa48("41"), options?.long)) ? fmtLong(val) : fmtShort(val);
    throw new Error(stryMutAct_9fa48("42") ? `` : (stryCov_9fa48("42"), `val is not a non-empty string or a valid number: ${JSON.stringify(val)}`));
  }
};

/** @param {string} str */
// Parse a time string to milliseconds
function parse(str) {
  if (stryMutAct_9fa48("43")) {
    {}
  } else {
    stryCov_9fa48("43");
    const s = stryMutAct_9fa48("44") ? str : (stryCov_9fa48("44"), str.trim());
    if (stryMutAct_9fa48("48") ? s.length <= 100 : stryMutAct_9fa48("47") ? s.length >= 100 : stryMutAct_9fa48("46") ? false : stryMutAct_9fa48("45") ? true : (stryCov_9fa48("45", "46", "47", "48"), s.length > 100)) return undefined;
    const match = PARSE_RE.exec(s);
    if (stryMutAct_9fa48("51") ? false : stryMutAct_9fa48("50") ? true : stryMutAct_9fa48("49") ? match : (stryCov_9fa48("49", "50", "51"), !match)) return undefined;
    const n = Number.parseFloat(match[1]);
    const unit = stryMutAct_9fa48("52") ? (match[2] || "ms").toUpperCase() : (stryCov_9fa48("52"), (stryMutAct_9fa48("55") ? match[2] && "ms" : stryMutAct_9fa48("54") ? false : stryMutAct_9fa48("53") ? true : (stryCov_9fa48("53", "54", "55"), match[2] || (stryMutAct_9fa48("56") ? "" : (stryCov_9fa48("56"), "ms")))).toLowerCase());
    if (stryMutAct_9fa48("59") ? unit === "ms" && unit.startsWith("millisecond") : stryMutAct_9fa48("58") ? false : stryMutAct_9fa48("57") ? true : (stryCov_9fa48("57", "58", "59"), (stryMutAct_9fa48("61") ? unit !== "ms" : stryMutAct_9fa48("60") ? false : (stryCov_9fa48("60", "61"), unit === (stryMutAct_9fa48("62") ? "" : (stryCov_9fa48("62"), "ms")))) || (stryMutAct_9fa48("63") ? unit.endsWith("millisecond") : (stryCov_9fa48("63"), unit.startsWith(stryMutAct_9fa48("64") ? "" : (stryCov_9fa48("64"), "millisecond")))))) return n;
    if (stryMutAct_9fa48("67") ? unit === "s" && unit.startsWith("sec") : stryMutAct_9fa48("66") ? false : stryMutAct_9fa48("65") ? true : (stryCov_9fa48("65", "66", "67"), (stryMutAct_9fa48("69") ? unit !== "s" : stryMutAct_9fa48("68") ? false : (stryCov_9fa48("68", "69"), unit === (stryMutAct_9fa48("70") ? "" : (stryCov_9fa48("70"), "s")))) || (stryMutAct_9fa48("71") ? unit.endsWith("sec") : (stryCov_9fa48("71"), unit.startsWith(stryMutAct_9fa48("72") ? "" : (stryCov_9fa48("72"), "sec")))))) return stryMutAct_9fa48("73") ? n / S : (stryCov_9fa48("73"), n * S);
    if (stryMutAct_9fa48("76") ? unit === "m" && unit.startsWith("min") : stryMutAct_9fa48("75") ? false : stryMutAct_9fa48("74") ? true : (stryCov_9fa48("74", "75", "76"), (stryMutAct_9fa48("78") ? unit !== "m" : stryMutAct_9fa48("77") ? false : (stryCov_9fa48("77", "78"), unit === (stryMutAct_9fa48("79") ? "" : (stryCov_9fa48("79"), "m")))) || (stryMutAct_9fa48("80") ? unit.endsWith("min") : (stryCov_9fa48("80"), unit.startsWith(stryMutAct_9fa48("81") ? "" : (stryCov_9fa48("81"), "min")))))) return stryMutAct_9fa48("82") ? n / M : (stryCov_9fa48("82"), n * M);
    if (stryMutAct_9fa48("85") ? (unit === "h" || unit.startsWith("hr")) && unit.startsWith("hour") : stryMutAct_9fa48("84") ? false : stryMutAct_9fa48("83") ? true : (stryCov_9fa48("83", "84", "85"), (stryMutAct_9fa48("87") ? unit === "h" && unit.startsWith("hr") : stryMutAct_9fa48("86") ? false : (stryCov_9fa48("86", "87"), (stryMutAct_9fa48("89") ? unit !== "h" : stryMutAct_9fa48("88") ? false : (stryCov_9fa48("88", "89"), unit === (stryMutAct_9fa48("90") ? "" : (stryCov_9fa48("90"), "h")))) || (stryMutAct_9fa48("91") ? unit.endsWith("hr") : (stryCov_9fa48("91"), unit.startsWith(stryMutAct_9fa48("92") ? "" : (stryCov_9fa48("92"), "hr")))))) || (stryMutAct_9fa48("93") ? unit.endsWith("hour") : (stryCov_9fa48("93"), unit.startsWith(stryMutAct_9fa48("94") ? "" : (stryCov_9fa48("94"), "hour")))))) return stryMutAct_9fa48("95") ? n / H : (stryCov_9fa48("95"), n * H);
    if (stryMutAct_9fa48("98") ? unit === "d" && unit.startsWith("day") : stryMutAct_9fa48("97") ? false : stryMutAct_9fa48("96") ? true : (stryCov_9fa48("96", "97", "98"), (stryMutAct_9fa48("100") ? unit !== "d" : stryMutAct_9fa48("99") ? false : (stryCov_9fa48("99", "100"), unit === (stryMutAct_9fa48("101") ? "" : (stryCov_9fa48("101"), "d")))) || (stryMutAct_9fa48("102") ? unit.endsWith("day") : (stryCov_9fa48("102"), unit.startsWith(stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), "day")))))) return stryMutAct_9fa48("104") ? n / D : (stryCov_9fa48("104"), n * D);
    if (stryMutAct_9fa48("107") ? unit === "w" && unit.startsWith("week") : stryMutAct_9fa48("106") ? false : stryMutAct_9fa48("105") ? true : (stryCov_9fa48("105", "106", "107"), (stryMutAct_9fa48("109") ? unit !== "w" : stryMutAct_9fa48("108") ? false : (stryCov_9fa48("108", "109"), unit === (stryMutAct_9fa48("110") ? "" : (stryCov_9fa48("110"), "w")))) || (stryMutAct_9fa48("111") ? unit.endsWith("week") : (stryCov_9fa48("111"), unit.startsWith(stryMutAct_9fa48("112") ? "" : (stryCov_9fa48("112"), "week")))))) return stryMutAct_9fa48("113") ? n / W : (stryCov_9fa48("113"), n * W);
    if (stryMutAct_9fa48("116") ? unit === "y" && unit.startsWith("year") : stryMutAct_9fa48("115") ? false : stryMutAct_9fa48("114") ? true : (stryCov_9fa48("114", "115", "116"), (stryMutAct_9fa48("118") ? unit !== "y" : stryMutAct_9fa48("117") ? false : (stryCov_9fa48("117", "118"), unit === (stryMutAct_9fa48("119") ? "" : (stryCov_9fa48("119"), "y")))) || (stryMutAct_9fa48("120") ? unit.endsWith("year") : (stryCov_9fa48("120"), unit.startsWith(stryMutAct_9fa48("121") ? "" : (stryCov_9fa48("121"), "year")))))) return stryMutAct_9fa48("122") ? n / Y : (stryCov_9fa48("122"), n * Y);
    return undefined;
  }
}

/** @param {number} ms */
// Format milliseconds to short string (1d, 2h, 3m)
function fmtShort(ms) {
  if (stryMutAct_9fa48("123")) {
    {}
  } else {
    stryCov_9fa48("123");
    const abs = Math.abs(ms);
    if (stryMutAct_9fa48("127") ? abs < D : stryMutAct_9fa48("126") ? abs > D : stryMutAct_9fa48("125") ? false : stryMutAct_9fa48("124") ? true : (stryCov_9fa48("124", "125", "126", "127"), abs >= D)) return stryMutAct_9fa48("128") ? `` : (stryCov_9fa48("128"), `${Math.round(stryMutAct_9fa48("129") ? ms * D : (stryCov_9fa48("129"), ms / D))}d`);
    if (stryMutAct_9fa48("133") ? abs < H : stryMutAct_9fa48("132") ? abs > H : stryMutAct_9fa48("131") ? false : stryMutAct_9fa48("130") ? true : (stryCov_9fa48("130", "131", "132", "133"), abs >= H)) return stryMutAct_9fa48("134") ? `` : (stryCov_9fa48("134"), `${Math.round(stryMutAct_9fa48("135") ? ms * H : (stryCov_9fa48("135"), ms / H))}h`);
    if (stryMutAct_9fa48("139") ? abs < M : stryMutAct_9fa48("138") ? abs > M : stryMutAct_9fa48("137") ? false : stryMutAct_9fa48("136") ? true : (stryCov_9fa48("136", "137", "138", "139"), abs >= M)) return stryMutAct_9fa48("140") ? `` : (stryCov_9fa48("140"), `${Math.round(stryMutAct_9fa48("141") ? ms * M : (stryCov_9fa48("141"), ms / M))}m`);
    if (stryMutAct_9fa48("145") ? abs < S : stryMutAct_9fa48("144") ? abs > S : stryMutAct_9fa48("143") ? false : stryMutAct_9fa48("142") ? true : (stryCov_9fa48("142", "143", "144", "145"), abs >= S)) return stryMutAct_9fa48("146") ? `` : (stryCov_9fa48("146"), `${Math.round(stryMutAct_9fa48("147") ? ms * S : (stryCov_9fa48("147"), ms / S))}s`);
    return stryMutAct_9fa48("148") ? `` : (stryCov_9fa48("148"), `${ms}ms`);
  }
}

/** @param {number} ms */
// Format milliseconds to long string (1 day, 2 hours)
function fmtLong(ms) {
  if (stryMutAct_9fa48("149")) {
    {}
  } else {
    stryCov_9fa48("149");
    const abs = Math.abs(ms);
    if (stryMutAct_9fa48("153") ? abs < D : stryMutAct_9fa48("152") ? abs > D : stryMutAct_9fa48("151") ? false : stryMutAct_9fa48("150") ? true : (stryCov_9fa48("150", "151", "152", "153"), abs >= D)) return plural(ms, abs, D, stryMutAct_9fa48("154") ? "" : (stryCov_9fa48("154"), "day"));
    if (stryMutAct_9fa48("158") ? abs < H : stryMutAct_9fa48("157") ? abs > H : stryMutAct_9fa48("156") ? false : stryMutAct_9fa48("155") ? true : (stryCov_9fa48("155", "156", "157", "158"), abs >= H)) return plural(ms, abs, H, stryMutAct_9fa48("159") ? "" : (stryCov_9fa48("159"), "hour"));
    if (stryMutAct_9fa48("163") ? abs < M : stryMutAct_9fa48("162") ? abs > M : stryMutAct_9fa48("161") ? false : stryMutAct_9fa48("160") ? true : (stryCov_9fa48("160", "161", "162", "163"), abs >= M)) return plural(ms, abs, M, stryMutAct_9fa48("164") ? "" : (stryCov_9fa48("164"), "minute"));
    if (stryMutAct_9fa48("168") ? abs < S : stryMutAct_9fa48("167") ? abs > S : stryMutAct_9fa48("166") ? false : stryMutAct_9fa48("165") ? true : (stryCov_9fa48("165", "166", "167", "168"), abs >= S)) return plural(ms, abs, S, stryMutAct_9fa48("169") ? "" : (stryCov_9fa48("169"), "second"));
    return stryMutAct_9fa48("170") ? `` : (stryCov_9fa48("170"), `${ms} ms`);
  }
}
function plural(ms, abs, unit, name) {
  if (stryMutAct_9fa48("171")) {
    {}
  } else {
    stryCov_9fa48("171");
    const isPlural = stryMutAct_9fa48("175") ? abs < unit * 1.5 : stryMutAct_9fa48("174") ? abs > unit * 1.5 : stryMutAct_9fa48("173") ? false : stryMutAct_9fa48("172") ? true : (stryCov_9fa48("172", "173", "174", "175"), abs >= (stryMutAct_9fa48("176") ? unit / 1.5 : (stryCov_9fa48("176"), unit * 1.5)));
    return stryMutAct_9fa48("177") ? `` : (stryCov_9fa48("177"), `${Math.round(stryMutAct_9fa48("178") ? ms * unit : (stryCov_9fa48("178"), ms / unit))} ${name}${isPlural ? stryMutAct_9fa48("179") ? "" : (stryCov_9fa48("179"), "s") : stryMutAct_9fa48("180") ? "Stryker was here!" : (stryCov_9fa48("180"), "")}`);
  }
}