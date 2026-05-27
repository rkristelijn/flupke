// @ts-nocheck
const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
module.exports = function nanoid(size = 21) {
  let id = "";
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < size; i++) id += ALPHABET[bytes[i] & 63];
  return id;
};
