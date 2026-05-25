/**
 * Drop-in replacement for ipaddr.js
 * IP address parsing, validation, and range classification.
 */

const IPV4_RE = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
const IPV6_FULL_RE = /^([0-9a-f]{0,4}:){2,7}[0-9a-f]{0,4}$/i;

class IPv4 {
  constructor(octets) { this.octets = octets; }
  kind() { return 'ipv4'; }
  toString() { return this.octets.join('.'); }
  toByteArray() { return [...this.octets]; }
  match(other, bits) {
    if (typeof other === 'object' && Array.isArray(other)) { bits = other[1]; other = other[0]; }
    if (other.kind && other.kind() !== 'ipv4') return false;
    const a = this.octets;
    const b = other.octets;
    for (let i = 0; i < 4 && bits > 0; i++) {
      const mask = bits >= 8 ? 255 : (256 - (1 << (8 - bits))) & 255;
      if ((a[i] & mask) !== (b[i] & mask)) return false;
      bits -= 8;
    }
    return true;
  }
  range() {
    const ranges = [
      ['unspecified', [[0, 0, 0, 0], 8]],
      ['loopback', [[127, 0, 0, 0], 8]],
      ['private', [[10, 0, 0, 0], 8]],
      ['private', [[172, 16, 0, 0], 12]],
      ['private', [[192, 168, 0, 0], 16]],
      ['linkLocal', [[169, 254, 0, 0], 16]],
      ['uniqueLocal', [[192, 0, 0, 0], 24]],
    ];
    for (const [name, [prefix, bits]] of ranges) {
      if (this.match(new IPv4(prefix), bits)) return name;
    }
    return 'unicast';
  }
  prefixLengthFromSubnetMask() {
    let bits = 0;
    let foundZero = false;
    for (const octet of this.octets) {
      for (let i = 7; i >= 0; i--) {
        if ((octet >> i) & 1) {
          if (foundZero) return null;
          bits++;
        } else {
          foundZero = true;
        }
      }
    }
    return bits;
  }
}

class IPv6 {
  constructor(parts) { this.parts = parts; }
  kind() { return 'ipv6'; }
  toString() { return compressIPv6(this.parts); }
  toByteArray() {
    const bytes = [];
    for (const part of this.parts) { bytes.push((part >> 8) & 0xff, part & 0xff); }
    return bytes;
  }
  isIPv4MappedAddress() {
    return this.parts[0] === 0 && this.parts[1] === 0 && this.parts[2] === 0 &&
           this.parts[3] === 0 && this.parts[4] === 0 && this.parts[5] === 0xffff;
  }
  toIPv4Address() {
    const hi = this.parts[6];
    const lo = this.parts[7];
    return new IPv4([(hi >> 8) & 0xff, hi & 0xff, (lo >> 8) & 0xff, lo & 0xff]);
  }
  match(other, bits) {
    if (typeof other === 'object' && Array.isArray(other)) { bits = other[1]; other = other[0]; }
    if (other.kind && other.kind() !== 'ipv6') return false;
    const a = this.parts;
    const b = other.parts;
    for (let i = 0; i < 8 && bits > 0; i++) {
      const mask = bits >= 16 ? 0xffff : (0xffff << (16 - bits)) & 0xffff;
      if ((a[i] & mask) !== (b[i] & mask)) return false;
      bits -= 16;
    }
    return true;
  }
  range() {
    if (this.parts.every(p => p === 0)) return 'unspecified';
    if (this.parts[0] === 0 && this.parts[1] === 0 && this.parts[2] === 0 &&
        this.parts[3] === 0 && this.parts[4] === 0 && this.parts[5] === 0 &&
        this.parts[6] === 0 && this.parts[7] === 1) return 'loopback';
    if (this.isIPv4MappedAddress()) return this.toIPv4Address().range();
    if ((this.parts[0] & 0xfe00) === 0xfc00) return 'uniqueLocal';
    if ((this.parts[0] & 0xffc0) === 0xfe80) return 'linkLocal';
    return 'unicast';
  }
}

function compressIPv6(parts) {
  const hex = parts.map(p => p.toString(16));
  let bestStart = -1, bestLen = 0, curStart = -1, curLen = 0;
  for (let i = 0; i < 8; i++) {
    if (parts[i] === 0) {
      if (curStart === -1) curStart = i;
      curLen++;
      if (curLen > bestLen) { bestStart = curStart; bestLen = curLen; }
    } else { curStart = -1; curLen = 0; }
  }
  if (bestLen > 1) {
    hex.splice(bestStart, bestLen, '');
    if (bestStart === 0) hex.unshift('');
    if (bestStart + bestLen === 8) hex.push('');
  }
  return hex.join(':');
}

function parseIPv4(str) {
  const m = IPV4_RE.exec(str);
  if (!m) return null;
  const octets = [+m[1], +m[2], +m[3], +m[4]];
  if (octets.some(o => o > 255)) return null;
  return new IPv4(octets);
}

function parseIPv6(str) {
  // Handle IPv4-mapped
  const lastColon = str.lastIndexOf(':');
  const possibleV4 = str.slice(lastColon + 1);
  if (possibleV4.includes('.')) {
    const v4 = parseIPv4(possibleV4);
    if (!v4) return null;
    const prefix = str.slice(0, lastColon + 1) + '0:0';
    const parts = expandIPv6(prefix);
    if (!parts) return null;
    parts[6] = (v4.octets[0] << 8) | v4.octets[1];
    parts[7] = (v4.octets[2] << 8) | v4.octets[3];
    return new IPv6(parts);
  }
  const parts = expandIPv6(str);
  return parts ? new IPv6(parts) : null;
}

function expandIPv6(str) {
  const sides = str.split('::');
  if (sides.length > 2) return null;
  if (sides.length === 2) {
    const left = sides[0] ? sides[0].split(':') : [];
    const right = sides[1] ? sides[1].split(':') : [];
    const fill = 8 - left.length - right.length;
    if (fill < 0) return null;
    const parts = [...left, ...Array(fill).fill('0'), ...right];
    return parts.map(p => parseInt(p, 16) || 0);
  }
  const parts = str.split(':');
  if (parts.length !== 8) return null;
  return parts.map(p => parseInt(p, 16) || 0);
}

function isValid(str) {
  if (typeof str !== 'string') return false;
  return parseIPv4(str) !== null || parseIPv6(str) !== null;
}

function parse(str) {
  const v4 = parseIPv4(str);
  if (v4) return v4;
  const v6 = parseIPv6(str);
  if (v6) return v6;
  throw new Error('ipaddr: the address has neither combatible IPv4 nor IPv6 format');
}

function parseCIDR(str) {
  const parts = str.split('/');
  if (parts.length !== 2) throw new Error('ipaddr: invalid CIDR notation');
  const addr = parse(parts[0]);
  const bits = parseInt(parts[1], 10);
  if (isNaN(bits)) throw new Error('ipaddr: invalid CIDR prefix length');
  return [addr, bits];
}

function process(str) {
  const addr = parse(str);
  if (addr.kind() === 'ipv6' && addr.isIPv4MappedAddress()) {
    return addr.toIPv4Address();
  }
  return addr;
}

function fromByteArray(bytes) {
  if (bytes.length === 4) return new IPv4([...bytes]);
  if (bytes.length === 16) {
    const parts = [];
    for (let i = 0; i < 16; i += 2) parts.push((bytes[i] << 8) | bytes[i + 1]);
    return new IPv6(parts);
  }
  throw new Error('ipaddr: invalid byte array length');
}

function subnetMatch(addr, rangeList, defaultName) {
  defaultName = defaultName || 'unicast';
  for (const [name, ranges] of Object.entries(rangeList)) {
    const list = Array.isArray(ranges[0]) ? ranges : [ranges];
    for (const range of list) {
      if (addr.match(range[0], range[1])) return name;
    }
  }
  return defaultName;
}

module.exports = { IPv4, IPv6, isValid, parse, parseCIDR, process, fromByteArray, subnetMatch };
