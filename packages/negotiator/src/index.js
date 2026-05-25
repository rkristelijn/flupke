/**
 * Drop-in replacement for negotiator
 * HTTP content negotiation (Accept, Accept-Language, Accept-Encoding, Accept-Charset)
 */

class Negotiator {
  constructor(req) {
    this.headers = req.headers || {};
  }

  mediaType(available) { return this.mediaTypes(available)[0] || undefined; }
  mediaTypes(available) { return negotiate(this.headers.accept || '*/*', available, parseMediaType, matchMedia); }

  language(available) { return this.languages(available)[0] || undefined; }
  languages(available) { return negotiate(this.headers['accept-language'] || '*', available, parseToken, matchToken); }

  encoding(available) { return this.encodings(available)[0] || undefined; }
  encodings(available) {
    const header = this.headers['accept-encoding'];
    // No header means identity only
    if (header === undefined) return available ? filterAvailable(['identity'], available) : ['identity'];
    return negotiate(header || 'identity', available, parseToken, matchToken);
  }

  charset(available) { return this.charsets(available)[0] || undefined; }
  charsets(available) { return negotiate(this.headers['accept-charset'] || '*', available, parseToken, matchToken); }
}

function negotiate(header, available, parseFn, matchFn) {
  const specs = parseHeader(header, parseFn);
  if (!available || available.length === 0) {
    return specs.filter(s => s.q > 0).map(s => s.value);
  }
  return filterAvailable(
    specs.filter(s => s.q > 0).sort((a, b) => b.q - a.q || a.i - b.i),
    available,
    matchFn
  );
}

function filterAvailable(specs, available, matchFn) {
  if (!matchFn) return available.filter(a => specs.some(s => s === a || s.value === a || s.value === '*'));
  const results = [];
  for (const item of available) {
    const match = specs.find(s => matchFn(s, item));
    if (match) results.push({ item, q: match.q, i: match.i });
  }
  return results.sort((a, b) => b.q - a.q || a.i - b.i).map(r => r.item);
}

function parseHeader(header, parseFn) {
  return header.split(',').map((part, i) => {
    const spec = parseFn(part.trim(), i);
    return spec;
  }).filter(Boolean);
}

function parseMediaType(str, i) {
  const parts = str.split(';');
  const value = parts[0].trim();
  if (!value) return null;
  let q = 1;
  for (let j = 1; j < parts.length; j++) {
    const param = parts[j].trim();
    if (param.startsWith('q=')) {
      q = parseFloat(param.slice(2)) || 0;
    }
  }
  return { value, q, i };
}

function parseToken(str, i) {
  const parts = str.split(';');
  const value = parts[0].trim();
  if (!value) return null;
  let q = 1;
  for (let j = 1; j < parts.length; j++) {
    const param = parts[j].trim();
    if (param.startsWith('q=')) {
      q = parseFloat(param.slice(2)) || 0;
    }
  }
  return { value, q, i };
}

function matchMedia(spec, item) {
  if (spec.value === '*/*') return true;
  const [sType, sSub] = spec.value.split('/');
  const [iType, iSub] = item.split('/');
  if (sType === '*') return true;
  if (sType !== iType) return false;
  if (sSub === '*') return true;
  return sSub === iSub;
}

function matchToken(spec, item) {
  if (spec.value === '*') return true;
  return spec.value.toLowerCase() === item.toLowerCase();
}

module.exports = Negotiator;
