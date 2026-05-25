/**
 * @flupkejs/nanoid — nanoid
 * @see https://www.npmjs.com/package/nanoid
 */
const { randomBytes } = require('node:crypto');
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
module.exports = function nanoid(size = 21) {
  const bytes = randomBytes(size);
  let id = '';
  for (let i = 0; i < size; i++) id += ALPHABET[bytes[i] & 63];
  return id;
};
