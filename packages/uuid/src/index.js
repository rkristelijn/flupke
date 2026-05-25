/**
 * @flupkejs/uuid — Drop-in replacement for uuid — uses native crypto.randomUUID()
 * @see https://www.npmjs.com/package/uuid
 */
'use strict';
// Implementation: native-first, zero dependencies
const crypto = require('node:crypto');

const NIL = '00000000-0000-0000-0000-000000000000';
const MAX = 'ffffffff-ffff-ffff-ffff-ffffffffffff';

/** Generate a random UUID v4 using crypto.randomUUID */
function v4() { return crypto.randomUUID(); }

/** Generate a time-ordered UUID v7 */
function v7() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const ts = Date.now();
  bytes[0] = (ts / 2**40) & 0xff;
  bytes[1] = (ts / 2**32) & 0xff;
  bytes[2] = (ts / 2**24) & 0xff;
  bytes[3] = (ts / 2**16) & 0xff;
  bytes[4] = (ts / 2**8) & 0xff;
  bytes[5] = ts & 0xff;
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return stringify(bytes);
}

function stringify(bytes) {
  const hex = Buffer.from(bytes).toString('hex');
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}

function parse(str) {
  const hex = str.replace(/-/g, '');
  return Uint8Array.from(Buffer.from(hex, 'hex'));
}

/** Validate a UUID string */
function validate(str) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

function version(str) {
  if (!validate(str)) return undefined;
  return parseInt(str[14], 16);
}

module.exports = { NIL, MAX, v4, v7, parse, stringify, validate, version };
