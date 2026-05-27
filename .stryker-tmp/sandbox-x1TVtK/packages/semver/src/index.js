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
function parse(v) {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    const m = String(v).match(stryMutAct_9fa48("10") ? /^(\d+)\.(\d+)\.(\d+)(?:-(.))?$/ : stryMutAct_9fa48("9") ? /^(\d+)\.(\d+)\.(\d+)(?:-(.+))$/ : stryMutAct_9fa48("8") ? /^(\d+)\.(\d+)\.(\D+)(?:-(.+))?$/ : stryMutAct_9fa48("7") ? /^(\d+)\.(\d+)\.(\d)(?:-(.+))?$/ : stryMutAct_9fa48("6") ? /^(\d+)\.(\D+)\.(\d+)(?:-(.+))?$/ : stryMutAct_9fa48("5") ? /^(\d+)\.(\d)\.(\d+)(?:-(.+))?$/ : stryMutAct_9fa48("4") ? /^(\D+)\.(\d+)\.(\d+)(?:-(.+))?$/ : stryMutAct_9fa48("3") ? /^(\d)\.(\d+)\.(\d+)(?:-(.+))?$/ : stryMutAct_9fa48("2") ? /^(\d+)\.(\d+)\.(\d+)(?:-(.+))?/ : stryMutAct_9fa48("1") ? /(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/ : (stryCov_9fa48("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"), /^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/));
    if (stryMutAct_9fa48("13") ? false : stryMutAct_9fa48("12") ? true : stryMutAct_9fa48("11") ? m : (stryCov_9fa48("11", "12", "13"), !m)) return null;
    return stryMutAct_9fa48("14") ? {} : (stryCov_9fa48("14"), {
      major: stryMutAct_9fa48("15") ? -m[1] : (stryCov_9fa48("15"), +m[1]),
      minor: stryMutAct_9fa48("16") ? -m[2] : (stryCov_9fa48("16"), +m[2]),
      patch: stryMutAct_9fa48("17") ? -m[3] : (stryCov_9fa48("17"), +m[3]),
      prerelease: stryMutAct_9fa48("20") ? m[4] && "" : stryMutAct_9fa48("19") ? false : stryMutAct_9fa48("18") ? true : (stryCov_9fa48("18", "19", "20"), m[4] || (stryMutAct_9fa48("21") ? "Stryker was here!" : (stryCov_9fa48("21"), ""))),
      version: v
    });
  }
}
function compare(a, b) {
  if (stryMutAct_9fa48("22")) {
    {}
  } else {
    stryCov_9fa48("22");
    const pa = parse(a);
    const pb = parse(b);
    if (stryMutAct_9fa48("25") ? !pa && !pb : stryMutAct_9fa48("24") ? false : stryMutAct_9fa48("23") ? true : (stryCov_9fa48("23", "24", "25"), (stryMutAct_9fa48("26") ? pa : (stryCov_9fa48("26"), !pa)) || (stryMutAct_9fa48("27") ? pb : (stryCov_9fa48("27"), !pb)))) return Number.NaN;
    if (stryMutAct_9fa48("30") ? pa.major === pb.major : stryMutAct_9fa48("29") ? false : stryMutAct_9fa48("28") ? true : (stryCov_9fa48("28", "29", "30"), pa.major !== pb.major)) return stryMutAct_9fa48("31") ? pa.major + pb.major : (stryCov_9fa48("31"), pa.major - pb.major);
    if (stryMutAct_9fa48("34") ? pa.minor === pb.minor : stryMutAct_9fa48("33") ? false : stryMutAct_9fa48("32") ? true : (stryCov_9fa48("32", "33", "34"), pa.minor !== pb.minor)) return stryMutAct_9fa48("35") ? pa.minor + pb.minor : (stryCov_9fa48("35"), pa.minor - pb.minor);
    if (stryMutAct_9fa48("38") ? pa.patch === pb.patch : stryMutAct_9fa48("37") ? false : stryMutAct_9fa48("36") ? true : (stryCov_9fa48("36", "37", "38"), pa.patch !== pb.patch)) return stryMutAct_9fa48("39") ? pa.patch + pb.patch : (stryCov_9fa48("39"), pa.patch - pb.patch);
    if (stryMutAct_9fa48("42") ? pa.prerelease || !pb.prerelease : stryMutAct_9fa48("41") ? false : stryMutAct_9fa48("40") ? true : (stryCov_9fa48("40", "41", "42"), pa.prerelease && (stryMutAct_9fa48("43") ? pb.prerelease : (stryCov_9fa48("43"), !pb.prerelease)))) return stryMutAct_9fa48("44") ? +1 : (stryCov_9fa48("44"), -1);
    if (stryMutAct_9fa48("47") ? !pa.prerelease || pb.prerelease : stryMutAct_9fa48("46") ? false : stryMutAct_9fa48("45") ? true : (stryCov_9fa48("45", "46", "47"), (stryMutAct_9fa48("48") ? pa.prerelease : (stryCov_9fa48("48"), !pa.prerelease)) && pb.prerelease)) return 1;
    return 0;
  }
}
function gt(a, b) {
  if (stryMutAct_9fa48("49")) {
    {}
  } else {
    stryCov_9fa48("49");
    return stryMutAct_9fa48("53") ? compare(a, b) <= 0 : stryMutAct_9fa48("52") ? compare(a, b) >= 0 : stryMutAct_9fa48("51") ? false : stryMutAct_9fa48("50") ? true : (stryCov_9fa48("50", "51", "52", "53"), compare(a, b) > 0);
  }
}
function lt(a, b) {
  if (stryMutAct_9fa48("54")) {
    {}
  } else {
    stryCov_9fa48("54");
    return stryMutAct_9fa48("58") ? compare(a, b) >= 0 : stryMutAct_9fa48("57") ? compare(a, b) <= 0 : stryMutAct_9fa48("56") ? false : stryMutAct_9fa48("55") ? true : (stryCov_9fa48("55", "56", "57", "58"), compare(a, b) < 0);
  }
}
function eq(a, b) {
  if (stryMutAct_9fa48("59")) {
    {}
  } else {
    stryCov_9fa48("59");
    return stryMutAct_9fa48("62") ? compare(a, b) !== 0 : stryMutAct_9fa48("61") ? false : stryMutAct_9fa48("60") ? true : (stryCov_9fa48("60", "61", "62"), compare(a, b) === 0);
  }
}
function satisfies(v, r) {
  if (stryMutAct_9fa48("63")) {
    {}
  } else {
    stryCov_9fa48("63");
    const p = parse(v);
    if (stryMutAct_9fa48("66") ? false : stryMutAct_9fa48("65") ? true : stryMutAct_9fa48("64") ? p : (stryCov_9fa48("64", "65", "66"), !p)) return stryMutAct_9fa48("67") ? true : (stryCov_9fa48("67"), false);
    const m = r.match(stryMutAct_9fa48("75") ? /^(\d+)\.(\d+)\.(\D+)$/ : stryMutAct_9fa48("74") ? /^(\d+)\.(\d+)\.(\d)$/ : stryMutAct_9fa48("73") ? /^(\d+)\.(\D+)\.(\d+)$/ : stryMutAct_9fa48("72") ? /^(\d+)\.(\d)\.(\d+)$/ : stryMutAct_9fa48("71") ? /^(\D+)\.(\d+)\.(\d+)$/ : stryMutAct_9fa48("70") ? /^(\d)\.(\d+)\.(\d+)$/ : stryMutAct_9fa48("69") ? /^(\d+)\.(\d+)\.(\d+)/ : stryMutAct_9fa48("68") ? /(\d+)\.(\d+)\.(\d+)$/ : (stryCov_9fa48("68", "69", "70", "71", "72", "73", "74", "75"), /^(\d+)\.(\d+)\.(\d+)$/));
    if (stryMutAct_9fa48("78") ? false : stryMutAct_9fa48("77") ? true : stryMutAct_9fa48("76") ? m : (stryCov_9fa48("76", "77", "78"), !m)) return stryMutAct_9fa48("79") ? true : (stryCov_9fa48("79"), false);
    const rm = stryMutAct_9fa48("80") ? {} : (stryCov_9fa48("80"), {
      major: stryMutAct_9fa48("81") ? -m[1] : (stryCov_9fa48("81"), +m[1]),
      minor: stryMutAct_9fa48("82") ? -m[2] : (stryCov_9fa48("82"), +m[2]),
      patch: stryMutAct_9fa48("83") ? -m[3] : (stryCov_9fa48("83"), +m[3])
    });
    return stryMutAct_9fa48("86") ? p.major === rm.major && p.minor === rm.minor || p.patch === rm.patch : stryMutAct_9fa48("85") ? false : stryMutAct_9fa48("84") ? true : (stryCov_9fa48("84", "85", "86"), (stryMutAct_9fa48("88") ? p.major === rm.major || p.minor === rm.minor : stryMutAct_9fa48("87") ? true : (stryCov_9fa48("87", "88"), (stryMutAct_9fa48("90") ? p.major !== rm.major : stryMutAct_9fa48("89") ? true : (stryCov_9fa48("89", "90"), p.major === rm.major)) && (stryMutAct_9fa48("92") ? p.minor !== rm.minor : stryMutAct_9fa48("91") ? true : (stryCov_9fa48("91", "92"), p.minor === rm.minor)))) && (stryMutAct_9fa48("94") ? p.patch !== rm.patch : stryMutAct_9fa48("93") ? true : (stryCov_9fa48("93", "94"), p.patch === rm.patch)));
  }
}
module.exports = stryMutAct_9fa48("95") ? {} : (stryCov_9fa48("95"), {
  parse,
  compare,
  gt,
  lt,
  eq,
  satisfies
});