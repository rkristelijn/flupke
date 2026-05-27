# Security Disclosures

## 1. ms — ReDoS in parse regex

**Report to:** https://github.com/vercel/ms/security/advisories/new

**Title:** ReDoS vulnerability in time string parsing

**Description:**
The regex used in `parse()` is vulnerable to catastrophic backtracking when given
a long numeric string followed by an invalid unit character.

**Proof of concept:**
```js
const ms = require('ms');
const start = Date.now();
ms('9'.repeat(1000) + 'z');
console.log(Date.now() - start); // ~4ms per call
```

In a server parsing user-supplied time strings (e.g. cache headers, rate limit config),
an attacker can send many such requests to cause CPU exhaustion.

**Suggested fix:**
Add input length validation before regex execution:
```js
if (str.length > 100) return undefined;
```

**CVSS:** Low (requires user input to reach parse function)
**CWE:** CWE-1333 (Inefficient Regular Expression Complexity)

---

## 2. debug — Regex injection via DEBUG env

**Report to:** https://github.com/debug-js/debug/security/advisories/new

**Title:** Unescaped regex special characters in namespace matching

**Description:**
The `enabled()` function converts the DEBUG environment variable into a regex
without escaping special characters. A DEBUG value containing regex metacharacters
(e.g. `(a+)+`) could cause ReDoS when testing namespace strings.

**Proof of concept:**
```js
process.env.DEBUG = '(a+)+$';
const debug = require('debug');
debug.enabled('a'.repeat(30) + 'b'); // hangs
```

**Suggested fix:**
Escape regex special characters before converting glob to regex:
```js
const escaped = p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
```

**CVSS:** Low (requires control over DEBUG env variable)
**CWE:** CWE-1333 (Inefficient Regular Expression Complexity)

---

## Timeline

- 2026-05-25: Vulnerabilities discovered during flupke development
- 2026-05-25: Reported to upstream maintainers (this document)
- 2026-08-25: Public disclosure (90 days)
