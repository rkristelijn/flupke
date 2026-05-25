const { test } = require('node:test');
const assert = require('node:assert/strict');
const moment = require('../src/index.js');

test('moment() returns current time', () => {
  const m = moment();
  assert.ok(Math.abs(m.valueOf() - Date.now()) < 100);
});

test('moment(string) parses ISO date', () => {
  assert.equal(moment('2026-05-25').format('YYYY-MM-DD'), '2026-05-25');
});

test('moment(date) wraps Date object', () => {
  const d = new Date(2026, 0, 1);
  assert.equal(moment(d).year(), 2026);
});

test('format() with tokens', () => {
  const m = moment('2026-12-25T14:30:00');
  assert.equal(m.format('YYYY'), '2026');
  assert.equal(m.format('MM'), '12');
  assert.equal(m.format('DD'), '25');
  assert.equal(m.format('HH:mm'), '14:30');
});

test('add and subtract', () => {
  const m = moment('2026-01-01');
  const added = m.add(1, 'day');
  assert.equal(added.format('YYYY-MM-DD'), '2026-01-02');
  const subtracted = added.subtract(1, 'day');
  assert.equal(subtracted.format('YYYY-MM-DD'), '2026-01-01');
});

test('diff', () => {
  const days = moment('2026-01-10').diff(moment('2026-01-01'), 'days');
  assert.equal(days, 9);
});

test('isBefore / isAfter', () => {
  assert.ok(moment('2026-01-01').isBefore('2026-12-31'));
  assert.ok(moment('2026-12-31').isAfter('2026-01-01'));
});

test('fromNow returns string', () => {
  const result = moment('2020-01-01').fromNow();
  assert.ok(result.includes('ago'));
});

test('custom parse format', () => {
  assert.equal(moment('25-05-2026', 'DD-MM-YYYY').format('YYYY-MM-DD'), '2026-05-25');
});

test('isMoment', () => {
  assert.ok(moment.isMoment(moment()));
  assert.ok(!moment.isMoment(new Date()));
});

test('utc', () => {
  const m = moment.utc('2026-06-15T12:00:00Z');
  assert.equal(m.format('YYYY-MM-DD'), '2026-06-15');
});

test('duration', () => {
  const d = moment.duration(5, 'minutes');
  assert.equal(d.asMilliseconds(), 300000);
});
