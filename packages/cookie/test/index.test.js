const { test } = require('node:test');
const assert = require('node:assert/strict');
const cookie = require('../src/index.js');
const origCookie = require('cookie');

test('parse simple cookies', () => {
  const result = cookie.parse('foo=bar; baz=qux');
  assert.equal(result.foo, 'bar');
  assert.equal(result.baz, 'qux');
});
test('parse encoded values', () => {
  const result = cookie.parse('foo=hello%20world');
  assert.equal(result.foo, 'hello world');
});
test('parse empty string', () => {
  const result = cookie.parse('');
  assert.equal(Object.keys(result).length, 0);
});
test('serialize basic', () => {
  assert.equal(cookie.serialize('foo', 'bar'), 'foo=bar');
});
test('serialize with options', () => {
  const result = cookie.serialize('name', 'value', { httpOnly: true, secure: true, path: '/' });
  assert.ok(result.includes('HttpOnly'));
  assert.ok(result.includes('Secure'));
  assert.ok(result.includes('Path=/'));
});
test('matches original parse', () => {
  const str = 'session=abc123; theme=dark; lang=en';
  const ours = cookie.parse(str);
  const orig = origCookie.parse(str);
  assert.equal(ours.session, orig.session);
  assert.equal(ours.theme, orig.theme);
  assert.equal(ours.lang, orig.lang);
});
test('matches original serialize', () => {
  assert.equal(cookie.serialize('a', 'b'), origCookie.serialize('a', 'b'));
});
