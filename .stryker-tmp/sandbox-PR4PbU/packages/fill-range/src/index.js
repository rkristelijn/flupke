// @ts-nocheck
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
function fillRange(start, end, step, options) {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    let opts = options;
    let inc = step;
    if (stryMutAct_9fa48("3") ? typeof step !== "object" : stryMutAct_9fa48("2") ? false : stryMutAct_9fa48("1") ? true : (stryCov_9fa48("1", "2", "3"), typeof step === (stryMutAct_9fa48("4") ? "" : (stryCov_9fa48("4"), "object")))) {
      if (stryMutAct_9fa48("5")) {
        {}
      } else {
        stryCov_9fa48("5");
        opts = step;
        inc = undefined;
      }
    }
    opts = stryMutAct_9fa48("8") ? opts && {} : stryMutAct_9fa48("7") ? false : stryMutAct_9fa48("6") ? true : (stryCov_9fa48("6", "7", "8"), opts || {});
    const transform = stryMutAct_9fa48("11") ? opts.transform && (v => v) : stryMutAct_9fa48("10") ? false : stryMutAct_9fa48("9") ? true : (stryCov_9fa48("9", "10", "11"), opts.transform || (stryMutAct_9fa48("12") ? () => undefined : (stryCov_9fa48("12"), v => v)));
    if (stryMutAct_9fa48("15") ? typeof start === "string" && start.length === 1 && typeof end === "string" || end.length === 1 : stryMutAct_9fa48("14") ? false : stryMutAct_9fa48("13") ? true : (stryCov_9fa48("13", "14", "15"), (stryMutAct_9fa48("17") ? typeof start === "string" && start.length === 1 || typeof end === "string" : stryMutAct_9fa48("16") ? true : (stryCov_9fa48("16", "17"), (stryMutAct_9fa48("19") ? typeof start === "string" || start.length === 1 : stryMutAct_9fa48("18") ? true : (stryCov_9fa48("18", "19"), (stryMutAct_9fa48("21") ? typeof start !== "string" : stryMutAct_9fa48("20") ? true : (stryCov_9fa48("20", "21"), typeof start === (stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), "string")))) && (stryMutAct_9fa48("24") ? start.length !== 1 : stryMutAct_9fa48("23") ? true : (stryCov_9fa48("23", "24"), start.length === 1)))) && (stryMutAct_9fa48("26") ? typeof end !== "string" : stryMutAct_9fa48("25") ? true : (stryCov_9fa48("25", "26"), typeof end === (stryMutAct_9fa48("27") ? "" : (stryCov_9fa48("27"), "string")))))) && (stryMutAct_9fa48("29") ? end.length !== 1 : stryMutAct_9fa48("28") ? true : (stryCov_9fa48("28", "29"), end.length === 1)))) {
      if (stryMutAct_9fa48("30")) {
        {}
      } else {
        stryCov_9fa48("30");
        return fillChars(start, end, inc, transform);
      }
    }
    const a = Number(start);
    const b = Number(end);
    if (stryMutAct_9fa48("33") ? Number.isNaN(a) && Number.isNaN(b) : stryMutAct_9fa48("32") ? false : stryMutAct_9fa48("31") ? true : (stryCov_9fa48("31", "32", "33"), Number.isNaN(a) || Number.isNaN(b))) throw new TypeError(stryMutAct_9fa48("34") ? "" : (stryCov_9fa48("34"), "fill-range: invalid range"));
    const stepVal = Math.abs(stryMutAct_9fa48("37") ? Number(inc) && 1 : stryMutAct_9fa48("36") ? false : stryMutAct_9fa48("35") ? true : (stryCov_9fa48("35", "36", "37"), Number(inc) || 1));
    const pad = stryMutAct_9fa48("40") ? opts.pad && typeof start === "string" && /^0\d/.test(start) : stryMutAct_9fa48("39") ? false : stryMutAct_9fa48("38") ? true : (stryCov_9fa48("38", "39", "40"), opts.pad || (stryMutAct_9fa48("42") ? typeof start === "string" || /^0\d/.test(start) : stryMutAct_9fa48("41") ? false : (stryCov_9fa48("41", "42"), (stryMutAct_9fa48("44") ? typeof start !== "string" : stryMutAct_9fa48("43") ? true : (stryCov_9fa48("43", "44"), typeof start === (stryMutAct_9fa48("45") ? "" : (stryCov_9fa48("45"), "string")))) && (stryMutAct_9fa48("47") ? /^0\D/ : stryMutAct_9fa48("46") ? /0\d/ : (stryCov_9fa48("46", "47"), /^0\d/)).test(start))));
    const width = pad ? stryMutAct_9fa48("48") ? Math.min(String(start).length, String(end).length) : (stryCov_9fa48("48"), Math.max(String(start).length, String(end).length)) : 0;
    const results = stryMutAct_9fa48("49") ? ["Stryker was here"] : (stryCov_9fa48("49"), []);
    if (stryMutAct_9fa48("53") ? a > b : stryMutAct_9fa48("52") ? a < b : stryMutAct_9fa48("51") ? false : stryMutAct_9fa48("50") ? true : (stryCov_9fa48("50", "51", "52", "53"), a <= b)) {
      if (stryMutAct_9fa48("54")) {
        {}
      } else {
        stryCov_9fa48("54");
        for (let i = a; stryMutAct_9fa48("57") ? i > b : stryMutAct_9fa48("56") ? i < b : stryMutAct_9fa48("55") ? false : (stryCov_9fa48("55", "56", "57"), i <= b); stryMutAct_9fa48("58") ? i -= stepVal : (stryCov_9fa48("58"), i += stepVal)) results.push(transform(padNum(i, width)));
      }
    } else {
      if (stryMutAct_9fa48("59")) {
        {}
      } else {
        stryCov_9fa48("59");
        for (let i = a; stryMutAct_9fa48("62") ? i < b : stryMutAct_9fa48("61") ? i > b : stryMutAct_9fa48("60") ? false : (stryCov_9fa48("60", "61", "62"), i >= b); stryMutAct_9fa48("63") ? i += stepVal : (stryCov_9fa48("63"), i -= stepVal)) results.push(transform(padNum(i, width)));
      }
    }
    return results;
  }
}
function fillChars(start, end, step, transform) {
  if (stryMutAct_9fa48("64")) {
    {}
  } else {
    stryCov_9fa48("64");
    const a = start.charCodeAt(0);
    const b = end.charCodeAt(0);
    const inc = Math.abs(stryMutAct_9fa48("67") ? Number(step) && 1 : stryMutAct_9fa48("66") ? false : stryMutAct_9fa48("65") ? true : (stryCov_9fa48("65", "66", "67"), Number(step) || 1));
    const results = stryMutAct_9fa48("68") ? ["Stryker was here"] : (stryCov_9fa48("68"), []);
    if (stryMutAct_9fa48("72") ? a > b : stryMutAct_9fa48("71") ? a < b : stryMutAct_9fa48("70") ? false : stryMutAct_9fa48("69") ? true : (stryCov_9fa48("69", "70", "71", "72"), a <= b)) {
      if (stryMutAct_9fa48("73")) {
        {}
      } else {
        stryCov_9fa48("73");
        for (let i = a; stryMutAct_9fa48("76") ? i > b : stryMutAct_9fa48("75") ? i < b : stryMutAct_9fa48("74") ? false : (stryCov_9fa48("74", "75", "76"), i <= b); stryMutAct_9fa48("77") ? i -= inc : (stryCov_9fa48("77"), i += inc)) results.push(transform(String.fromCharCode(i)));
      }
    } else {
      if (stryMutAct_9fa48("78")) {
        {}
      } else {
        stryCov_9fa48("78");
        for (let i = a; stryMutAct_9fa48("81") ? i < b : stryMutAct_9fa48("80") ? i > b : stryMutAct_9fa48("79") ? false : (stryCov_9fa48("79", "80", "81"), i >= b); stryMutAct_9fa48("82") ? i += inc : (stryCov_9fa48("82"), i -= inc)) results.push(transform(String.fromCharCode(i)));
      }
    }
    return results;
  }
}
function padNum(n, width) {
  if (stryMutAct_9fa48("83")) {
    {}
  } else {
    stryCov_9fa48("83");
    if (stryMutAct_9fa48("86") ? false : stryMutAct_9fa48("85") ? true : stryMutAct_9fa48("84") ? width : (stryCov_9fa48("84", "85", "86"), !width)) return String(n);
    const s = String(Math.abs(n));
    const padded = s.padStart(width, stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), "0"));
    return (stryMutAct_9fa48("91") ? n >= 0 : stryMutAct_9fa48("90") ? n <= 0 : stryMutAct_9fa48("89") ? false : stryMutAct_9fa48("88") ? true : (stryCov_9fa48("88", "89", "90", "91"), n < 0)) ? stryMutAct_9fa48("92") ? `` : (stryCov_9fa48("92"), `-${padded}`) : padded;
  }
}
module.exports = fillRange;