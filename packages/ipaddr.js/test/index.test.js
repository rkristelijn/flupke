'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const ipaddr = require('../src/index.js');

describe('ipaddr.js', () => {
  describe('isValid', () => {
    it('should validate IPv4', () => {
      assert.strictEqual(ipaddr.isValid('192.168.1.1'), true);
      assert.strictEqual(ipaddr.isValid('0.0.0.0'), true);
      assert.strictEqual(ipaddr.isValid('255.255.255.255'), true);
    });

    it('should validate IPv6', () => {
      assert.strictEqual(ipaddr.isValid('::1'), true);
      assert.strictEqual(ipaddr.isValid('fe80::1'), true);
      assert.strictEqual(ipaddr.isValid('2001:db8::1'), true);
    });

    it('should reject invalid addresses', () => {
      assert.strictEqual(ipaddr.isValid('invalid'), false);
      assert.strictEqual(ipaddr.isValid('256.1.1.1'), false);
      assert.strictEqual(ipaddr.isValid(''), false);
    });
  });

  describe('parse', () => {
    it('should parse IPv4', () => {
      const addr = ipaddr.parse('192.168.1.1');
      assert.strictEqual(addr.kind(), 'ipv4');
      assert.strictEqual(addr.toString(), '192.168.1.1');
    });

    it('should parse IPv6', () => {
      const addr = ipaddr.parse('::1');
      assert.strictEqual(addr.kind(), 'ipv6');
    });

    it('should throw on invalid', () => {
      assert.throws(() => ipaddr.parse('invalid'));
    });
  });

  describe('IPv4 range', () => {
    it('should detect loopback', () => {
      assert.strictEqual(ipaddr.parse('127.0.0.1').range(), 'loopback');
    });

    it('should detect private', () => {
      assert.strictEqual(ipaddr.parse('10.0.0.1').range(), 'private');
      assert.strictEqual(ipaddr.parse('192.168.1.1').range(), 'private');
      assert.strictEqual(ipaddr.parse('172.16.0.1').range(), 'private');
    });

    it('should detect unicast', () => {
      assert.strictEqual(ipaddr.parse('8.8.8.8').range(), 'unicast');
    });
  });

  describe('IPv6 range', () => {
    it('should detect loopback', () => {
      assert.strictEqual(ipaddr.parse('::1').range(), 'loopback');
    });

    it('should detect unspecified', () => {
      assert.strictEqual(ipaddr.parse('::').range(), 'unspecified');
    });
  });

  describe('IPv4-mapped IPv6', () => {
    it('should detect IPv4-mapped addresses', () => {
      const addr = ipaddr.parse('::ffff:192.168.1.1');
      assert.strictEqual(addr.isIPv4MappedAddress(), true);
    });

    it('should convert to IPv4', () => {
      const addr = ipaddr.parse('::ffff:192.168.1.1');
      const v4 = addr.toIPv4Address();
      assert.strictEqual(v4.kind(), 'ipv4');
      assert.strictEqual(v4.toString(), '192.168.1.1');
    });
  });

  describe('parseCIDR', () => {
    it('should parse CIDR notation', () => {
      const [addr, bits] = ipaddr.parseCIDR('192.168.1.0/24');
      assert.strictEqual(addr.kind(), 'ipv4');
      assert.strictEqual(bits, 24);
    });

    it('should throw on invalid CIDR', () => {
      assert.throws(() => ipaddr.parseCIDR('invalid'));
    });
  });

  describe('process', () => {
    it('should return IPv4 for mapped addresses', () => {
      const addr = ipaddr.process('::ffff:192.168.1.1');
      assert.strictEqual(addr.kind(), 'ipv4');
      assert.strictEqual(addr.toString(), '192.168.1.1');
    });

    it('should return IPv6 for regular IPv6', () => {
      const addr = ipaddr.process('::1');
      assert.strictEqual(addr.kind(), 'ipv6');
    });
  });

  describe('match', () => {
    it('should match IPv4 subnet', () => {
      const addr = ipaddr.parse('192.168.1.100');
      const subnet = ipaddr.parse('192.168.1.0');
      assert.strictEqual(addr.match(subnet, 24), true);
      assert.strictEqual(addr.match(subnet, 32), false);
    });
  });
});
