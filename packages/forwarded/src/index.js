/**
 * Parse X-Forwarded-For header and return array of addresses.
 * First element is the socket address, followed by forwarded addresses in reverse.
 * @param {object} req - HTTP request
 * @returns {string[]}
 */
function forwarded(req) {
  if (!req) throw new TypeError('argument req is required');
  const socketAddr = req.connection && req.connection.remoteAddress || '';
  const header = req.headers && req.headers['x-forwarded-for'] || '';
  const addrs = [socketAddr];
  if (header) {
    const parts = header.split(',');
    for (let i = parts.length - 1; i >= 0; i--) {
      const addr = parts[i].trim();
      if (addr) addrs.push(addr);
    }
  }
  return addrs;
}

module.exports = forwarded;
